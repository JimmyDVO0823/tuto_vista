package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.services.ConfiguracionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/configuracion")
@RequiredArgsConstructor
public class ConfiguracionController {

    private final ConfiguracionService configuracionService;

    @GetMapping("/comision")
    public ResponseEntity<Map<String, Object>> obtenerComision() {
        BigDecimal comision = configuracionService.obtenerComision();
        return ResponseEntity.ok(Map.of("comision", comision));
    }

    @PutMapping("/comision")
    public ResponseEntity<Map<String, String>> guardarComision(@RequestBody Map<String, Object> payload) {
        if (!payload.containsKey("comision")) {
            return ResponseEntity.badRequest().body(Map.of("error", "El campo 'comision' es requerido."));
        }
        try {
            BigDecimal nuevaComision = new BigDecimal(payload.get("comision").toString());
            configuracionService.guardarComision(nuevaComision);
            return ResponseEntity.ok(Map.of("mensaje", "Comisión actualizada exitosamente."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
