package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.SesionTutoriaDTO;
import com.tutorias.tutorias_backend.enums.EstadoSesion;
import com.tutorias.tutorias_backend.services.SesionTutoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/sesiones")
@RequiredArgsConstructor
public class SesionTutoriaController {

    private final SesionTutoriaService sesionTutoriaService;

    @PostMapping("/desde-solicitud/{solicitudId}")
    public ResponseEntity<SesionTutoriaDTO> crearDesdeSolicitud(@PathVariable Long solicitudId) {
        return ResponseEntity.ok(sesionTutoriaService.crearDesdeSolicitud(solicitudId));
    }

    @GetMapping("/tutor/{id}")
    public ResponseEntity<List<SesionTutoriaDTO>> getByTutor(@PathVariable Long id) {
        return ResponseEntity.ok(sesionTutoriaService.getByTutor(id));
    }

    @GetMapping("/estudiante/{id}")
    public ResponseEntity<List<SesionTutoriaDTO>> getByEstudiante(@PathVariable Long id) {
        return ResponseEntity.ok(sesionTutoriaService.getByEstudiante(id));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<SesionTutoriaDTO> actualizarEstado(
            @PathVariable Long id, 
            @RequestParam EstadoSesion estado) {
        return ResponseEntity.ok(sesionTutoriaService.actualizarEstado(id, estado));
    }
}
