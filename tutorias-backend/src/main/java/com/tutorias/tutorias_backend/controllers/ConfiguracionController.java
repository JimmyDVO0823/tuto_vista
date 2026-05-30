package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.services.ConfiguracionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.Map;

/**
 * Controlador REST para la gestión de la configuración global del sistema.
 * Permite consultar y modificar parámetros como la comisión por tutoría.
 */
@RestController
@RequestMapping("/configuracion")
@RequiredArgsConstructor
public class ConfiguracionController {

    private final ConfiguracionService configuracionService;

    /**
     * Obtiene el valor actual de la comisión aplicada a las tutorías.
     *
     * @return ResponseEntity con un mapa que contiene el valor de la comisión.
     */
    @GetMapping("/comision")
    public ResponseEntity<Map<String, Object>> obtenerComision() {
        BigDecimal comision = configuracionService.obtenerComision();
        return ResponseEntity.ok(Map.of("comision", comision));
    }

    /**
     * Actualiza el valor de la comisión del sistema.
     *
     * @param payload Mapa que debe contener la clave "comision" con el nuevo valor.
     * @return ResponseEntity con un mensaje de éxito o error.
     */
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
