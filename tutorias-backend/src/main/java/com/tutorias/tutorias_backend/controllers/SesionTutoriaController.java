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

    /**
     * Programa una nueva sesión de tutoría a partir de una solicitud aprobada.
     * @param solicitudId ID de la solicitud.
     * @return SesionTutoriaDTO creada.
     */
    @PostMapping("/desde-solicitud/{solicitudId}")
    public ResponseEntity<SesionTutoriaDTO> crearDesdeSolicitud(@PathVariable Long solicitudId) {
        return ResponseEntity.ok(sesionTutoriaService.crearDesdeSolicitud(solicitudId));
    }

    @GetMapping("/tutor/{id}")
    public ResponseEntity<List<SesionTutoriaDTO>> getByTutor(@PathVariable Long id) {
        return ResponseEntity.ok(sesionTutoriaService.getByTutor(id));
    }

    @GetMapping("/tutor/{id}/proximas")
    public ResponseEntity<com.tutorias.tutorias_backend.dto.PagedResponseDTO<SesionTutoriaDTO>> getProximasByTutor(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(sesionTutoriaService.getProximasByTutor(id, page, size));
    }

    @GetMapping("/estudiante/{id}")
    public ResponseEntity<List<SesionTutoriaDTO>> getByEstudiante(@PathVariable Long id) {
        return ResponseEntity.ok(sesionTutoriaService.getByEstudiante(id));
    }

    @GetMapping("/estudiante/{id}/proximas")
    public ResponseEntity<com.tutorias.tutorias_backend.dto.PagedResponseDTO<SesionTutoriaDTO>> getProximasByEstudiante(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(sesionTutoriaService.getProximasByEstudiante(id, page, size));
    }

    /**
     * Actualiza el estado (COMPLETADA, CANCELADA, etc.) de una sesión existente.
     * @param id ID de la sesión.
     * @param body Mapa con 'estado' y opcionalmente 'motivoCancelacion'.
     * @return SesionTutoriaDTO actualizada.
     */
    @PatchMapping("/{id}/estado")
    public ResponseEntity<SesionTutoriaDTO> actualizarEstado(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, Object> body) {

        EstadoSesion estado = EstadoSesion.valueOf(body.get("estado").toString());
        String motivo = (String) body.get("motivoCancelacion");

        return ResponseEntity.ok(sesionTutoriaService.actualizarEstado(id, estado, motivo));
    }

    @PatchMapping("/{id}/enlace")
    public ResponseEntity<SesionTutoriaDTO> actualizarEnlace(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, String> body) {

        // Extraemos el valor usando la llave "enlaceReunion"
        String enlaceReunion = body.get("enlaceReunion");
        return ResponseEntity.ok(sesionTutoriaService.actualizarEnlace(id, enlaceReunion));
    }
}
