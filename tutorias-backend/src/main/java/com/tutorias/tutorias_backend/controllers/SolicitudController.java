package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.SolicitudDTO;
import com.tutorias.tutorias_backend.dto.SolicitudRequest;
import com.tutorias.tutorias_backend.enums.EstadoSolicitud;
import com.tutorias.tutorias_backend.services.SolicitudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/solicitudes")
@RequiredArgsConstructor
public class SolicitudController {

    private final SolicitudService solicitudService;
    private final com.tutorias.tutorias_backend.repositories.PerfilRepository perfilRepository;

    /**
     * Crea una nueva solicitud de tutoría para el estudiante autenticado.
     * @param request Datos de la solicitud.
     * @param authentication Información del usuario autenticado.
     * @return SolicitudDTO creada.
     */
    @PostMapping
    public ResponseEntity<SolicitudDTO> crear(
            @RequestBody SolicitudRequest request,
            org.springframework.security.core.Authentication authentication) {
        String email = authentication.getName();
        com.tutorias.tutorias_backend.entities.Perfil perfil = perfilRepository.findByCorreo(email)
                .orElseThrow(() -> new RuntimeException("Perfil no encontrado"));
        Long estudianteId = perfil.getId();
        return ResponseEntity.ok(solicitudService.crear(estudianteId, request));
    }

    @GetMapping("/estudiante/{id}")
    public ResponseEntity<List<SolicitudDTO>> getByEstudiante(@PathVariable Long id) {
        return ResponseEntity.ok(solicitudService.getByEstudiante(id));
    }

    @GetMapping("/estudiante/{id}/por-pagar")
    public ResponseEntity<com.tutorias.tutorias_backend.dto.PagedResponseDTO<SolicitudDTO>> getPorPagarByEstudiante(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(solicitudService.getPorPagarByEstudiante(id, page, size));
    }

    @GetMapping("/tutor/{id}")
    public ResponseEntity<List<SolicitudDTO>> getByTutor(@PathVariable Long id) {
        return ResponseEntity.ok(solicitudService.getByTutor(id));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<SolicitudDTO> actualizarEstado(
            @PathVariable Long id,
            @RequestParam EstadoSolicitud estado) {
        return ResponseEntity.ok(solicitudService.actualizarEstado(id, estado));
    }
}
