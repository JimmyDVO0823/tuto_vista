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

    @PostMapping
    public ResponseEntity<SolicitudDTO> crear(@RequestBody SolicitudRequest request) {
        // TODO: Obtener el ID del estudiante desde el token JWT
        // Por ahora usamos un ID fijo o lo pasaremos en el request para pruebas rápidas
        // En producción se sacará del SecurityContextHolder
        Long estudianteId = 1L; 
        return ResponseEntity.ok(solicitudService.crear(estudianteId, request));
    }

    @GetMapping("/estudiante/{id}")
    public ResponseEntity<List<SolicitudDTO>> getByEstudiante(@PathVariable Long id) {
        return ResponseEntity.ok(solicitudService.getByEstudiante(id));
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
