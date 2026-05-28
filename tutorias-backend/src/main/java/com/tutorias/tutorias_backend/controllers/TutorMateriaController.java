package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.TutorMateriaDTO;
import com.tutorias.tutorias_backend.services.TutorMateriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutores/{tutorId}/materias")
@RequiredArgsConstructor
public class TutorMateriaController {

    private final TutorMateriaService tutorMateriaService;

    @GetMapping
    public ResponseEntity<List<TutorMateriaDTO>> getMaterias(@PathVariable Long tutorId) {
        return ResponseEntity.ok(tutorMateriaService.getTutorMaterias(tutorId));
    }

    @PostMapping
    public ResponseEntity<String> asignarMateria(
            @PathVariable Long tutorId,
            @RequestBody java.util.Map<String, Long> payload) {
        Long materiaId = payload.get("materiaId");
        tutorMateriaService.asignarMateria(tutorId, materiaId);
        return ResponseEntity.ok("Materia asignada exitosamente");
    }

    @PatchMapping("/{materiaId}/toggle")
    public ResponseEntity<Void> toggleStatus(@PathVariable Long tutorId, @PathVariable Long materiaId) {
        tutorMateriaService.toggleStatus(tutorId, materiaId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{materiaId}")
    public ResponseEntity<Void> deleteMateria(@PathVariable Long tutorId, @PathVariable Long materiaId) {
        tutorMateriaService.deleteMateria(tutorId, materiaId);
        return ResponseEntity.noContent().build();
    }
}
