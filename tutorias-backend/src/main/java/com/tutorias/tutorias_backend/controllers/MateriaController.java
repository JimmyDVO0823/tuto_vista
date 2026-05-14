package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.MateriaDTO;
import com.tutorias.tutorias_backend.services.MateriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/materias")
@RequiredArgsConstructor
public class MateriaController {

    private final MateriaService materiaService;

    @GetMapping
    public ResponseEntity<List<MateriaDTO>> getAll(
            @RequestParam(required = false) Long departamentoId) {
        if (departamentoId != null) {
            return ResponseEntity.ok(materiaService.getMateriasByDepartamento(departamentoId));
        }
        return ResponseEntity.ok(materiaService.getAllMaterias());
    }
}
