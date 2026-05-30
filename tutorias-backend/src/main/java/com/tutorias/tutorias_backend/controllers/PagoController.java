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
     * Endpoint de Simulación de Pago (Reemplaza a Mercado Pago para pruebas locales).
     * Marca una solicitud como pagada y crea la sesión automáticamente.
     * @param payload Mapa con 'solicitudId'.
     * @return PagoDTO o error.
     */
    @PostMapping("/simular")
    public ResponseEntity<?> simularPago(@RequestBody Map<String, Object> payload) {
        try {
            if (!payload.containsKey("solicitudId")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Falta el campo solicitudId"));
            }
            String solicitudIdStr = payload.get("solicitudId").toString();
            Long solicitudId = Long.parseLong(solicitudIdStr);
            
            System.out.println("DEBUG: Iniciando simulación de pago para solicitudId: " + solicitudId);
            
            // Usamos la lógica existente para registrar pago y crear sesión
            PagoDTO response = pagoService.registrarPagoYCrearSesion(solicitudId);
            
            System.out.println("DEBUG: Pago simulado exitoso para solicitudId: " + solicitudId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("ERROR en simularPago: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "error", "Internal Server Error",
                "message", e.getMessage() != null ? e.getMessage() : "Excepción desconocida"
            ));
        }
    }

    @GetMapping("/preferencia/{solicitudId}")
    public ResponseEntity<?> getPreferencia(@PathVariable Long solicitudId) {
        try {
            String initPoint = pagoService.crearPreferencia(solicitudId);
            return ResponseEntity.ok(Map.of("init_point", initPoint));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
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