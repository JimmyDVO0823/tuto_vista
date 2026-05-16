package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.PagoDTO;
import com.tutorias.tutorias_backend.services.PagoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/pagos")
@RequiredArgsConstructor
public class PagoController {

    private final PagoService pagoService;

    @PostMapping("/sesion/{sesionId}")
    public ResponseEntity<PagoDTO> registrarPago(@PathVariable Long sesionId) {
        return ResponseEntity.ok(pagoService.registrarPago(sesionId));
    }

    @GetMapping("/tutor/{id}")
    public ResponseEntity<List<PagoDTO>> getByTutor(@PathVariable Long id) {
        return ResponseEntity.ok(pagoService.getByTutor(id));
    }
}
