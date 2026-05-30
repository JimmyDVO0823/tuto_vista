package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.AuthResponse;
import com.tutorias.tutorias_backend.dto.LoginRequest;
import com.tutorias.tutorias_backend.dto.RegisterRequest;
import com.tutorias.tutorias_backend.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Controlador REST para la gestión de autenticación y sesiones.
 * Proporciona endpoints para registro, inicio de sesión, verificación de cuenta y renovación de tokens.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Endpoints para Login y gestión de sesiones")
public class AuthController {

    private final AuthService authService;

    /**
     * Endpoint de prueba para verificar la disponibilidad del servicio de autenticación.
     *
     * @return ResponseEntity con un mensaje de éxito.
     */
    @GetMapping("/test")
    @Operation(summary = "Endpoint de prueba para verificar conexión")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Conexión exitosa con el backend");
    }

    /**
     * Endpoint para autenticación de usuarios.
     * @param request Datos de acceso.
     * @return Token JWT y perfil del usuario.
     */
    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión y obtener JWT")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * Endpoint para registro de nuevos perfiles.
     * @param request Datos del registro.
     * @return Mensaje de éxito informando sobre el correo de verificación.
     */
    @PostMapping("/register")
    @Operation(summary = "Registrar un nuevo perfil (estudiante, tutor o admin)")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario registrado exitosamente. Por favor, verifica tu correo electrónico para activar tu cuenta.");
        return ResponseEntity.ok(response);
    }

    /**
     * Verifica una cuenta de usuario mediante un token enviado por correo electrónico.
     *
     * @param token Token de verificación.
     * @return ResponseEntity con un mensaje de éxito tras la activación.
     */
    @GetMapping("/verify")
    @Operation(summary = "Verificar correo electrónico")
    public ResponseEntity<Map<String, String>> verify(@RequestParam String token) {
        authService.verifyAccount(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Cuenta activada con éxito. Ya puedes iniciar sesión.");
        return ResponseEntity.ok(response);
    }

    /**
     * Renueva el token JWT de la sesión actual.
     *
     * @param authHeader Cabecera de autorización que contiene el token actual.
     * @return ResponseEntity con el nuevo token JWT.
     */
    @PostMapping("/refresh")
    @Operation(summary = "Renovar el token de sesión")
    public ResponseEntity<AuthResponse> refresh(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }
        String token = authHeader.substring(7);
        return ResponseEntity.ok(authService.refreshToken(token));
    }
}
