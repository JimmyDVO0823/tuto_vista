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
            @RequestParam(required = false) Long materiaId) {
        return ResponseEntity.ok(
                tutorService.getTutoresDisponibles(minPrecio, maxPrecio, minCalificacion, materiaId)
        );
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
}
