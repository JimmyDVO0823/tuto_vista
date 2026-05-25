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

    @PostMapping("/especifica")
    public ResponseEntity<Void> createDisponibilidadEspecifica(
            @jakarta.validation.Valid @RequestBody com.tutorias.tutorias_backend.dto.DispoEspecificaDTO dto,
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails) {

        // Delegamos la lógica y validación de seguridad a la capa de servicio
        disponibilidadService.createDisponibilidadEspecifica(dto, userDetails.getUsername());

        // Retorna un 204 No Content que tu api.js procesa limpiamente
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/especifica/{id}")
    public ResponseEntity<Void> deleteDispoEspecifica(@PathVariable Long id) {
        disponibilidadService.deleteDispoEspecifica(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/especifica/tutor/{tutorId}")
    public ResponseEntity<List<com.tutorias.tutorias_backend.dto.DispoEspecificaDTO>> getEspecificasByTutor(
            @PathVariable Long tutorId) {
        // Retorna la lista formateada en DTOs, eliminando el error 400 y los ciclos
        // JSON
        return ResponseEntity.ok(disponibilidadService.getEspecificasByTutor(tutorId));
    }
}
