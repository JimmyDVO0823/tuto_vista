package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.ResenaDTO;
import com.tutorias.tutorias_backend.services.ResenaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/resenas")
@RequiredArgsConstructor
public class ResenaController {

    private final ResenaService resenaService;

    @PostMapping("/sesion/{sesionId}")
    public ResponseEntity<ResenaDTO> crear(
            @PathVariable Long sesionId,
            @RequestParam BigDecimal puntuacion,
            @RequestParam(required = false) String comentario) {
        return ResponseEntity.ok(resenaService.crear(sesionId, puntuacion, comentario));
    }

    @GetMapping("/tutor/{id}")
    public ResponseEntity<List<ResenaDTO>> getByTutor(@PathVariable Long id) {
        return ResponseEntity.ok(resenaService.getByTutor(id));
    }
}
