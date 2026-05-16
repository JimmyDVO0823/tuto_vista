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
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }
}
