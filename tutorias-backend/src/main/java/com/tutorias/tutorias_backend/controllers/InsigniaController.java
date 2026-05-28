package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.InsigniaDTO;
import com.tutorias.tutorias_backend.services.InsigniaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/insignias")
@RequiredArgsConstructor
public class InsigniaController {

    private final InsigniaService insigniaService;

    @GetMapping
    public ResponseEntity<List<InsigniaDTO>> getAllInsignias() {
        return ResponseEntity.ok(insigniaService.findAll());
    }

    @PostMapping
    public ResponseEntity<InsigniaDTO> createInsignia(@RequestBody InsigniaDTO dto) {
        return ResponseEntity.ok(insigniaService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InsigniaDTO> updateInsignia(@PathVariable Long id, @RequestBody InsigniaDTO dto) {
        return ResponseEntity.ok(insigniaService.update(id, dto));
    }
}
