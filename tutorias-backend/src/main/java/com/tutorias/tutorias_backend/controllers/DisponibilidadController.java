package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.DisponibilidadDTO;
import com.tutorias.tutorias_backend.services.DisponibilidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disponibilidad")
@CrossOrigin(origins = "http://localhost:5173")
public class DisponibilidadController {

    @Autowired
    private DisponibilidadService disponibilidadService;

    @GetMapping("/tutor/{tutorId}")
    public ResponseEntity<List<DisponibilidadDTO>> getDisponibilidad(@PathVariable Long tutorId) {
        return ResponseEntity.ok(disponibilidadService.getDisponibilidadByTutor(tutorId));
    }

    @PostMapping
    public ResponseEntity<DisponibilidadDTO> createDisponibilidad(@RequestBody DisponibilidadDTO dto) {
        return ResponseEntity.ok(disponibilidadService.createDisponibilidad(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDisponibilidad(@PathVariable Long id) {
        disponibilidadService.deleteDisponibilidad(id);
        return ResponseEntity.noContent().build();
    }
}
