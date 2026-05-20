package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.ReporteDTO;
import com.tutorias.tutorias_backend.services.ReporteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reportes")
@RequiredArgsConstructor
public class ReporteController {

    private final ReporteService reporteService;

    @GetMapping
    public ResponseEntity<List<ReporteDTO>> getAllReportes() {
        return ResponseEntity.ok(reporteService.findAll());
    }

    @PostMapping
    public ResponseEntity<ReporteDTO> createReporte(@RequestBody ReporteDTO dto) {
        return ResponseEntity.ok(reporteService.create(dto));
    }
}
