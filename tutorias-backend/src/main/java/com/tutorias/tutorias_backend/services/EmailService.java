package com.tutorias.tutorias_backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Servicio encargado de la comunicación externa vía correo electrónico.
 * Utiliza la API de Brevo para envíos transaccionales como la verificación de cuentas.
 */
@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${brevo.api.url}")
    private String apiUrl;

    @Value("${brevo.api.key}")
    private String apiKey;

    @Value("${brevo.sender.email}")
    private String senderEmail;

    @Value("${brevo.sender.name}")
    private String senderName;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Envía un correo electrónico en formato HTML para verificación de cuenta usando la API REST de Brevo.
     */
    public void enviarCorreoVerificacion(String correoDestino, String nombreUsuario, String tokenVerificacion) {
        System.out.println("🚀 Iniciando envío vía BREVO API (HTTP) a: " + correoDestino);
        
        try {
            // Configurar Headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("api-key", apiKey);

            // Construir el cuerpo de la petición (JSON)
            Map<String, Object> body = new HashMap<>();
            
            // Remitente
            Map<String, String> sender = new HashMap<>();
            sender.put("name", senderName);
            sender.put("email", senderEmail);
            body.put("sender", sender);

            // Destinatario
            Map<String, String> receiver = new HashMap<>();
            receiver.put("email", correoDestino);
            receiver.put("name", nombreUsuario);
            body.put("to", Collections.singletonList(receiver));

            // Asunto
            body.put("subject", "🔑 Activa tu cuenta de Tutorías");

            // Contenido HTML
            String contenidoHtml = "<html><body style='font-family: Arial, sans-serif; color: #333;'>"
                + "<div style='max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 12px;'>"
                + "<h2 style='color: #002045;'>¡Bienvenido a nuestra Plataforma de Tutorías!</h2>"
                + "<p>Hola, <strong>" + nombreUsuario + "</strong>,</p>"
                + "<p>Gracias por registrarte. Para activar tu cuenta y empezar a usar todos nuestros servicios, por favor haz clic en el siguiente enlace:</p>"
                + "<div style='text-align: center; margin: 30px 0;'>"
                + "  <a href='https://jimmydvo0823.github.io/tuto_vista/#/verified?token=" + tokenVerificacion + "' "
                + "     style='background-color: #D4AF37; color: #002045; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;'>"
                + "     Verificar Mi Correo"
                + "  </a>"
                + "</div>"
                + "<p style='font-size: 12px; color: #666;'>Si tú no solicitaste este registro, puedes ignorar este mensaje.</p>"
                + "</div>"
                + "</body></html>";
            
            body.put("htmlContent", contenidoHtml);

            // Enviar Petición
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);

            if (response.getStatusCode() == HttpStatus.CREATED || response.getStatusCode() == HttpStatus.OK) {
                System.out.println("✅ Correo enviado con éxito mediante BREVO API a: " + correoDestino);
            } else {
                System.err.println("⚠️ Brevo respondió con código: " + response.getStatusCode() + " - " + response.getBody());
            }

        } catch (Exception e) {
            System.err.println("❌ Falló el envío del correo electrónico vía BREVO API: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
