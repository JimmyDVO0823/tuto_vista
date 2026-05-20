package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.PlanTutoriaDTO;
import com.tutorias.tutorias_backend.services.PlanTutoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planes")
@RequiredArgsConstructor
public class PlanTutoriaController {

    private final PlanTutoriaService planTutoriaService;

    @GetMapping
    public ResponseEntity<List<PlanTutoriaDTO>> getAllPlanes() {
        return ResponseEntity.ok(planTutoriaService.findAll());
    }

    @GetMapping("/tutor/{tutorId}")
    public ResponseEntity<List<PlanTutoriaDTO>> getPlanesByTutor(@PathVariable Long tutorId) {
        return ResponseEntity.ok(planTutoriaService.findByTutor(tutorId));
    }

    @PostMapping
    public ResponseEntity<PlanTutoriaDTO> createPlan(@RequestBody PlanTutoriaDTO dto) {
        return ResponseEntity.ok(planTutoriaService.create(dto));
    }
}
