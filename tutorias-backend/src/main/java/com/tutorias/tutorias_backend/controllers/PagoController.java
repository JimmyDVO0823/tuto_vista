package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.PagoDTO;
import com.tutorias.tutorias_backend.services.PagoService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pagos")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PagoController {

    private final PagoService pagoService;

    /**
     * Endpoint de Simulación de Pago (Reemplaza a Mercado Pago para pruebas)
     * Marca una solicitud como pagada y crea la sesión automáticamente.
     */
    @PostMapping("/simular")
    public ResponseEntity<PagoDTO> simularPago(@RequestBody Map<String, Object> payload) {
        try {
            String solicitudIdStr = payload.get("solicitudId").toString();
            Long solicitudId = Long.parseLong(solicitudIdStr);
            
            // Usamos la lógica existente para registrar pago y crear sesión
            PagoDTO response = pagoService.registrarPagoYCrearSesion(solicitudId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/confirmar")
    public ResponseEntity<PagoDTO> confirmarPago(@RequestBody Map<String, Object> payload) {
        String solicitudIdStr = payload.get("solicitudId").toString();
        Long solicitudId = Long.parseLong(solicitudIdStr);
        return ResponseEntity.ok(pagoService.registrarPagoYCrearSesion(solicitudId));
    }

    // ── 📝 MÉTODOS ADMINISTRATIVOS EXISTENTES (NO LOS BORRES) ─────────────────
    @PostMapping("/sesion/{sesionId}")
    public ResponseEntity<PagoDTO> registrarPago(@PathVariable Long sesionId) {
        return ResponseEntity.ok(pagoService.registrarPago(sesionId));
    }

    @GetMapping("/tutor/{id}")
    public ResponseEntity<List<PagoDTO>> getByTutor(@PathVariable Long id) {
        return ResponseEntity.ok(pagoService.getByTutor(id));
    }
}