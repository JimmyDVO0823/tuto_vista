package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.PagoDTO;
import com.tutorias.tutorias_backend.services.PagoService;

// 1. NUEVAS IMPORTACIONES DE MERCADO PAGO (SDK 2.1.2)
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.payment.PaymentClient; // 👈 Para buscar el estado real del pago
import com.mercadopago.resources.preference.Preference;
import com.mercadopago.resources.payment.Payment; // 👈 Mapeo de la respuesta del pago

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
@CrossOrigin(origins = "*") // 👈 Permite que tu app en GitHub Pages se conecte sin bloqueos de CORS
@RequiredArgsConstructor
public class PagoController {

    private final PagoService pagoService;

    // ── 🆕 ENDPOINT PARA INTEGRACIÓN CON MERCADO PAGO ───────────────────────
    @PostMapping("/crear-preferencia")
    public ResponseEntity<Map<String, String>> crearPreferencia(@RequestBody Map<String, Object> payload) {
        try {
            // Configura tu token de acceso de PRUEBA
            MercadoPagoConfig
                    .setAccessToken("APP_USR-1005658941468040-052519-ad0111f9f1607cf86de49133cdb2042b-3425252781");

            // Recibimos el monto desde React
            String montoStr = payload.get("monto").toString();
            BigDecimal monto = new BigDecimal(montoStr);

            String solicitudIdStr = payload.get("solicitudId").toString();

            // Creamos el ítem conceptual de la transacción
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .title("Asesoría Académica - The Academic")
                    .quantity(1)
                    .unitPrice(monto)
                    .currencyId("COP")
                    .build();

            // Retornos seguros apuntando a tu interfaz de GitHub Pages con rutas Hash (#)
            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success("https://jimmydvo0823.github.io/tuto_vista/#/dashboard")
                    .failure("https://jimmydvo0823.github.io/tuto_vista/#/dispo")
                    .pending("https://jimmydvo0823.github.io/tuto_vista/#/dashboard")
                    .build();

            /*
             * * 🌟 CONFIGURACIÓN DEL WEBHOOK EN RAILWAY
             * Reemplaza 'tu-app-en-railway.up.railway.app' por el dominio real de tu API.
             * Mercado Pago usará este enlace público para avisar los cambios de estado.
             */
            String urlWebhookRailway = "https://tutovista-production.up.railway.app/";

            // Construimos la preferencia con la referencia externa (solicitudId) y la URL
            // de notificación
            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(Collections.singletonList(itemRequest))
                    .backUrls(backUrls)
                    .externalReference(solicitudIdStr)
                    .notificationUrl(urlWebhookRailway) // 👈 Vinculación del webhook dinámico
                    .autoReturn("approved") // Te devuelve automáticamente a GitHub Pages si sale bien
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

    // ── 🆕 RECEPTOR DE WEBHOOKS EN SEGUNDO PLANO (ASÍNCRONO) ─────────────────
    @PostMapping("/webhook")
    public ResponseEntity<Void> recibirWebhook(@RequestBody Map<String, Object> notification,
            @RequestParam(value = "type", required = false) String type) {
        try {
            MercadoPagoConfig
                    .setAccessToken("APP_USR-1005658941468040-052519-ad0111f9f1607cf86de49133cdb2042b-3425252781");

            // Mercado Pago puede enviar el tipo en los query params o dentro del cuerpo
            // JSON
            String actionType = type != null ? type : (String) notification.get("type");

            // Evaluamos de forma estricta si la notificación corresponde a un pago
            if ("payment".equals(actionType)) {
                Map<String, Object> data = (Map<String, Object>) notification.get("data");
                if (data != null && data.containsKey("id")) {
                    String paymentIdStr = data.get("id").toString();
                    Long paymentId = Long.parseLong(paymentIdStr);

                    // Consultamos directamente a Mercado Pago el estado real del recaudo financiero
                    PaymentClient paymentClient = new PaymentClient();
                    Payment paymentInfo = paymentClient.get(paymentId);

                    // Si la entidad aprueba los fondos
                    if ("approved".equals(paymentInfo.getStatus())) {
                        String solicitudIdStr = paymentInfo.getExternalReference(); // Recuperamos el solicitudId
                                                                                    // asociado
                        if (solicitudIdStr != null) {
                            Long solicitudId = Long.parseLong(solicitudIdStr);

                            // Registramos el pago e instanciamos la sesión en el calendario
                            pagoService.registrarPagoYCrearSesion(solicitudId);
                            System.out.println("✅ Webhook Railway Procesado: Solicitud ID " + solicitudId);
                        }
                    }
                }
            }

            // ⚠️ Obligatorio responder HTTP 200 a MP inmediatamente para frenar los
            // reintentos automáticos
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            System.err.println("❌ Error procesando el webhook en Railway: " + e.getMessage());
            return ResponseEntity.ok().build();
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