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

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PerfilRepository perfilRepository;
    private final EstudianteRepository estudianteRepository;
    private final TutorRepository tutorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse login(LoginRequest request) {
        // ... (lógica de login existente)
        Perfil perfil = perfilRepository.findByCorreo(request.getCorreo())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), perfil.getContrasenaHash())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        return generateAuthResponse(perfil);
    }

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

        // 5. Devolver respuesta con Token
        return generateAuthResponse(perfilGuardado);
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
                .rol(perfil.getRol())
                .build();
    }
}
