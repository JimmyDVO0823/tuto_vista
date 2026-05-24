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
    private final com.tutorias.tutorias_backend.repositories.PerfilRepository perfilRepository;

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
            @jakarta.validation.Valid @RequestBody com.tutorias.tutorias_backend.dto.TutorUpdateDTO updateDto,
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {
        
        // Verificación de seguridad: El ID solicitado debe coincidir con el ID del perfil autenticado
        Perfil authPerfil = perfilRepository.findByCorreo(userDetails.getUsername())
                .orElseThrow(() -> new org.springframework.security.access.AccessDeniedException("Usuario no encontrado"));
        
        if (!authPerfil.getId().equals(id)) {
            throw new org.springframework.security.access.AccessDeniedException("No tienes permiso para actualizar este perfil");
        }

        return ResponseEntity.ok(perfilService.actualizarTutor(id, updateDto));
    }
}
