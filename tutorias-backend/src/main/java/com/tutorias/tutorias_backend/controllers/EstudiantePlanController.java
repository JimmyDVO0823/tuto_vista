package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.EstudiantePlanDTO;
import com.tutorias.tutorias_backend.services.EstudiantePlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estudiantes-planes")
@RequiredArgsConstructor
public class EstudiantePlanController {

    private final EstudiantePlanService estudiantePlanService;

    @GetMapping("/estudiante/{estudianteId}")
    public ResponseEntity<List<EstudiantePlanDTO>> getPlanesByEstudiante(@PathVariable Long estudianteId) {
        return ResponseEntity.ok(estudiantePlanService.findByEstudiante(estudianteId));
    }

    @PostMapping
    public ResponseEntity<EstudiantePlanDTO> createEstudiantePlan(@RequestBody EstudiantePlanDTO dto) {
        return ResponseEntity.ok(estudiantePlanService.create(dto));
    }
}
