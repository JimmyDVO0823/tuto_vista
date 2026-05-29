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

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Endpoints para Login y gestión de sesiones")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/test")
    @Operation(summary = "Endpoint de prueba para verificar conexión")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Conexión exitosa con el backend");
    }

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión y obtener JWT")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    @Operation(summary = "Registrar un nuevo perfil (estudiante, tutor o admin)")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario registrado exitosamente. Por favor, verifica tu correo electrónico para activar tu cuenta.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify")
    @Operation(summary = "Verificar correo electrónico")
    public ResponseEntity<Map<String, String>> verify(@RequestParam String token) {
        authService.verifyAccount(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Cuenta activada con éxito. Ya puedes iniciar sesión.");
        return ResponseEntity.ok(response);
    }

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
