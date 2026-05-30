package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.AuthResponse;
import com.tutorias.tutorias_backend.dto.LoginRequest;
import com.tutorias.tutorias_backend.dto.RegisterRequest;
import com.tutorias.tutorias_backend.entities.Estudiante;
import com.tutorias.tutorias_backend.entities.Perfil;
import com.tutorias.tutorias_backend.entities.Tutor;
import com.tutorias.tutorias_backend.repositories.EstudianteRepository;
import com.tutorias.tutorias_backend.repositories.PerfilRepository;
import com.tutorias.tutorias_backend.repositories.TutorRepository;
import com.tutorias.tutorias_backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

/**
 * Servicio encargado de la autenticación, registro y gestión de sesiones de usuario.
 * Proporciona lógica para inicio de sesión, registro de nuevos perfiles,
 * verificación de cuentas vía correo y renovación de tokens JWT.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final PerfilRepository perfilRepository;
    private final EstudianteRepository estudianteRepository;
    private final TutorRepository tutorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    /**
     * Autentica a un usuario mediante correo y contraseña.
     * @param request Datos de acceso (correo, password).
     * @return AuthResponse con el token JWT y datos básicos del perfil.
     */
    public AuthResponse login(LoginRequest request) {
        Perfil perfil = perfilRepository.findByCorreo(request.getCorreo())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // ✨ ¡NUEVA VALIDACIÓN!: Verificar si el usuario está activo
        if (perfil.getEstaActivo() != null && !perfil.getEstaActivo()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Tu cuenta ha sido desactivada. Contacta al administrador.");
        }

        if (!passwordEncoder.matches(request.getPassword(), perfil.getContrasenaHash())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        return generateAuthResponse(perfil);
    }

    /**
     * Registra un nuevo usuario en la plataforma.
     * @param request Datos del nuevo usuario (nombre, correo, password, rol).
     * @return null (se requiere verificación por correo previo a la primera sesión).
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // 1. Verificar si el correo ya existe
        if (perfilRepository.findByCorreo(request.getCorreo()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }

        // 2. Crear nueva entidad Perfil
        Perfil nuevoPerfil = new Perfil();
        nuevoPerfil.setNombreCompleto(request.getNombreCompleto());
        nuevoPerfil.setCorreo(request.getCorreo());
        nuevoPerfil.setContrasenaHash(passwordEncoder.encode(request.getPassword()));
        nuevoPerfil.setRol(request.getRol());
        nuevoPerfil.setEstaActivo(false); // 🔥 Registrar como inactivo hasta verificar correo

        // 3. Guardar Perfil en DB
        Perfil perfilGuardado = perfilRepository.save(nuevoPerfil);

        // 4. Crear registro especializado según el Rol
        if (request.getRol().name().equals("estudiante")) {
            Estudiante estudiante = new Estudiante();
            estudiante.setPerfil(perfilGuardado);
            estudianteRepository.save(estudiante);
        } else if (request.getRol().name().equals("tutor")) {
            Tutor tutor = new Tutor();
            tutor.setPerfil(perfilGuardado);
            tutorRepository.save(tutor);
        }

        // 5. Enviar Correo de Verificación
        String verificationToken = jwtUtil.generateVerificationToken(perfilGuardado.getCorreo());
        emailService.enviarCorreoVerificacion(perfilGuardado.getCorreo(), perfilGuardado.getNombreCompleto(), verificationToken);

        // 6. Devolver respuesta informativa (sin token de sesión)
        return null; 
    }

    /**
     * Verifica la cuenta de un usuario mediante un token enviado por correo.
     * @param token Token de verificación.
     */
    @Transactional
    public void verifyAccount(String token) {
        String email = jwtUtil.extractUsername(token);
        Perfil perfil = perfilRepository.findByCorreo(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (perfil.getEstaActivo() != null && perfil.getEstaActivo()) {
            throw new RuntimeException("La cuenta ya está activada");
        }

        perfil.setEstaActivo(true);
        perfilRepository.save(perfil);
    }

    /**
     * Renueva el token de autenticación basándose en un token válido previo.
     *
     * @param token Token JWT actual (puede estar próximo a expirar).
     * @return AuthResponse con el nuevo token y datos del perfil.
     */
    public AuthResponse refreshToken(String token) {
        String email = jwtUtil.extractUsername(token);
        Perfil perfil = perfilRepository.findByCorreo(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // ✨ ¡NUEVA VALIDACIÓN TAMBIÉN AQUÍ!: Evita que refresquen sesión si los
        // desactivaron
        if (perfil.getEstaActivo() != null && !perfil.getEstaActivo()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Tu cuenta ha sido desactivada. Contacta al administrador.");
        }

        return generateAuthResponse(perfil);
    }

    private AuthResponse generateAuthResponse(Perfil perfil) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("id", perfil.getId());
        extraClaims.put("rol", perfil.getRol());

        String token = jwtUtil.generateToken(extraClaims, perfil.getCorreo());

        return AuthResponse.builder()
                .token(token)
                .id(perfil.getId())
                .correo(perfil.getCorreo())
                .nombreCompleto(perfil.getNombreCompleto())
                .urlAvatar(perfil.getUrlAvatar())
                .rol(perfil.getRol())
                .build();
    }
}
