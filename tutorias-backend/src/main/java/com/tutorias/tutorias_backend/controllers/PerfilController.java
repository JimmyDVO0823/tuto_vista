package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.entities.Perfil;
import com.tutorias.tutorias_backend.entities.Tutor;
import com.tutorias.tutorias_backend.services.PerfilService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/perfiles")
@RequiredArgsConstructor
public class PerfilController {

    private final PerfilService perfilService;

    @PatchMapping("/{id}")
    public ResponseEntity<Perfil> actualizarBasico(
            @PathVariable Long id,
            @RequestParam String nombre,
            @RequestParam(required = false) String avatar) {
        return ResponseEntity.ok(perfilService.actualizarBasico(id, nombre, avatar));
    }

    @PatchMapping("/tutor/{id}")
    public ResponseEntity<Tutor> actualizarTutor(
            @PathVariable Long id,
            @RequestParam String biografia,
            @RequestParam String frase) {
        return ResponseEntity.ok(perfilService.actualizarTutor(id, biografia, frase));
    }
}
