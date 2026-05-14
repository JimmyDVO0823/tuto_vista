package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.entities.Recurso;
import com.tutorias.tutorias_backend.services.RecursoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/recursos")
@RequiredArgsConstructor
public class RecursoController {

    private final RecursoService recursoService;

    @PostMapping
    public ResponseEntity<Recurso> crear(
            @RequestParam Long tutorId,
            @RequestParam Long materiaId,
            @RequestBody Recurso recurso) {
        return ResponseEntity.ok(recursoService.crear(tutorId, materiaId, recurso));
    }

    @GetMapping("/materia/{id}")
    public ResponseEntity<List<Recurso>> getByMateria(@PathVariable Long id) {
        return ResponseEntity.ok(recursoService.getByMateria(id));
    }

    @GetMapping("/tutor/{id}")
    public ResponseEntity<List<Recurso>> getByTutor(@PathVariable Long id) {
        return ResponseEntity.ok(recursoService.getByTutor(id));
    }
}
