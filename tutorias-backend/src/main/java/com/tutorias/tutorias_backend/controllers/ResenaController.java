package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.ResenaCreateRequest;
import com.tutorias.tutorias_backend.dto.ResenaDTO;
import com.tutorias.tutorias_backend.services.ResenaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/resenas")
@RequiredArgsConstructor
public class ResenaController {

    private final ResenaService resenaService;

    @PostMapping
    public ResponseEntity<ResenaDTO> crear(@RequestBody ResenaCreateRequest request) {
        return ResponseEntity.ok(resenaService.crear(request));
    }

    @GetMapping("/tutor/{id}")
    public ResponseEntity<List<ResenaDTO>> getByTutor(@PathVariable Long id) {
        return ResponseEntity.ok(resenaService.getByTutor(id));
    }
}
