package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.MateriaDTO;
import com.tutorias.tutorias_backend.dto.TutorDTO;
import com.tutorias.tutorias_backend.services.TutorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/tutores")
@RequiredArgsConstructor
public class TutorController {

    private final TutorService tutorService;

    /**
     * GET /tutores
     * Parámetros opcionales para filtrar:
     *  - minPrecio, maxPrecio
     *  - minCalificacion
     *  - materiaId
     */
    @GetMapping
    public ResponseEntity<List<TutorDTO>> getTutores(
            @RequestParam(required = false) BigDecimal minPrecio,
            @RequestParam(required = false) BigDecimal maxPrecio,
            @RequestParam(required = false) BigDecimal minCalificacion,
            @RequestParam(required = false) Long materiaId,
            @RequestParam(required = false) Long departamentoId) {
        return ResponseEntity.ok(
                tutorService.getTutoresDisponibles(minPrecio, maxPrecio, minCalificacion, materiaId, departamentoId)
        );
    }

    /**
     * GET /tutores/{id}
     * Obtiene el perfil de un tutor específico por su ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TutorDTO> getTutorById(@PathVariable Long id) {
        return ResponseEntity.ok(tutorService.getTutorById(id));
    }

    /**
     * GET /tutores/{id}/materias
     * Devuelve las materias de un tutor específico.
     */
    @GetMapping("/{id}/materias")
    public ResponseEntity<List<MateriaDTO>> getMateriasByTutor(@PathVariable Long id) {
        return ResponseEntity.ok(tutorService.getMateriasByTutor(id));
    }
    /**
     * POST /tutores/{id}/materias
     * Asigna una materia al catálogo del tutor.
     */
    @PostMapping("/{id}/materias")
    public ResponseEntity<String> asignarMateria(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, Long> payload) {
        Long materiaId = payload.get("materiaId");
        tutorService.asignarMateria(id, materiaId);
        return ResponseEntity.ok("Materia asignada exitosamente");
    }

    /**
     * GET /tutores/{id}/stats
     * Obtiene estadísticas dinámicas (horas, rating, ingresos) para el dashboard.
     */
    @GetMapping("/{id}/stats")
    public ResponseEntity<com.tutorias.tutorias_backend.dto.TutorStatsDTO> getTutorStats(@PathVariable Long id) {
        return ResponseEntity.ok(tutorService.getTutorStats(id));
    }

    /**
     * GET /tutores/{id}/income-report
     * Obtiene el reporte detallado de ingresos (semana, mes, año, historial).
     */
    @GetMapping("/{id}/income-report")
    public ResponseEntity<com.tutorias.tutorias_backend.dto.TutorIncomeReportDto> getIncomeReport(@PathVariable Long id) {
        return ResponseEntity.ok(tutorService.getIncomeReport(id));
    }

    /**
     * PATCH /tutores/{id}/disponibilidad
     * Cambia el estado de disponibilidad global del tutor.
     */
    @PatchMapping("/{id}/disponibilidad")
    public ResponseEntity<Void> actualizarDisponibilidad(
            @PathVariable Long id,
            @RequestParam boolean estado) {
        tutorService.actualizarDisponibilidad(id, estado);
        return ResponseEntity.noContent().build();
    }
}
