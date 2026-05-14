package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.DepartamentoDTO;
import com.tutorias.tutorias_backend.services.DepartamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/departamentos")
@RequiredArgsConstructor
public class DepartamentoController {

    private final DepartamentoService departamentoService;

    @GetMapping
    public ResponseEntity<List<DepartamentoDTO>> getAll() {
        return ResponseEntity.ok(departamentoService.getAllDepartamentos());
    }
}
