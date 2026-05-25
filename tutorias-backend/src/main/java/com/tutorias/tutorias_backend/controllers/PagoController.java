package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.PagoDTO;
import com.tutorias.tutorias_backend.services.PagoService;

// 1. NUEVAS IMPORTACIONES DE MERCADO PAGO (SDK 2.1.2)
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.resources.preference.Preference;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pagos")
@CrossOrigin(origins = "*") // 👈 Permite que React se conecte sin bloqueos
@RequiredArgsConstructor
public class PagoController {

    private final PagoService pagoService;

    // ── 🆕 ENDPOINT PARA INTEGRACIÓN CON MERCADO PAGO ───────────────────────
    @PostMapping("/crear-preferencia")
    public ResponseEntity<Map<String, String>> crearPreferencia(@RequestBody Map<String, Object> payload) {
        try {
            // Configura tu token de acceso de PRUEBA (Copia el tuyo de Mercado Pago Developers)
            MercadoPagoConfig.setAccessToken("APP_USR-1005658941468040-052519-ad0111f9f1607cf86de49133cdb2042b-3425252781");

            // Recibimos el monto desde React
            String montoStr = payload.get("monto").toString();
            BigDecimal monto = new BigDecimal(montoStr);

            // Creamos el ítem conceptual de la transacción
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .title("Asesoría Académica - The Academic")
                    .quantity(1)
                    .unitPrice(monto)
                    .currencyId("COP")
                    .build();

            // Configuramos los retornos seguros usando las rutas con Hash (#) para evitar 404
            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success("https://jimmydvo0823.github.io/tuto_vista/#/dashboard")
                    .failure("https://jimmydvo0823.github.io/tuto_vista/#/dispo")
                    .pending("https://jimmydvo0823.github.io/tuto_vista/#/dashboard")
                    .build();

            // Construimos la preferencia
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(Collections.singletonList(itemRequest))
                    .backUrls(backUrls)
                    .autoReturn("approved") // Te devuelve automáticamente a la app si sale bien
                    .build();

            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            // Respondemos al frontend con el link seguro de la pasarela
            Map<String, String> response = new HashMap<>();
            response.put("urlPago", preference.getInitPoint());
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No se pudo generar la pasarela de pagos");
            return ResponseEntity.status(500).body(errorResponse);
        }
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