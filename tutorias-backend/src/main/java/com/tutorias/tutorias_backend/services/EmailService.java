package com.tutorias.tutorias_backend.services;

import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleRefreshTokenRequest;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Properties;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Value("${google.gmail.client-id:}")
    private String clientId;

    @Value("${google.gmail.client-secret:}")
    private String clientSecret;

    @Value("${google.gmail.refresh-token:}")
    private String refreshToken;

    @Value("${spring.mail.username}")
    private String senderEmail;

    /**
     * Envía un correo electrónico en formato HTML para verificación de cuenta usando Gmail API (HTTP).
     */
    public void enviarCorreoVerificacion(String correoDestino, String nombreUsuario, String tokenVerificacion) {
        System.out.println("🚀 Iniciando envío vía GMAIL API (HTTP) a: " + correoDestino);
        
        try {
            // 1. Obtener Access Token usando el Refresh Token
            String accessToken = getAccessToken();

            // 2. Construir el correo (MimeMessage)
            MimeMessage email = createEmail(correoDestino, senderEmail, "🔑 Verifica tu cuenta de Tutorías", nombreUsuario, tokenVerificacion);

            // 3. Enviar vía Gmail API
            sendMessage(accessToken, "me", email);
            
            System.out.println("✅ Correo enviado con éxito mediante GMAIL API a: " + correoDestino);

        } catch (Exception e) {
            System.err.println("❌ Falló el envío del correo electrónico vía GMAIL API: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private String getAccessToken() throws IOException {
        TokenResponse response = new GoogleRefreshTokenRequest(
                new com.google.api.client.http.javanet.NetHttpTransport(),
                new GsonFactory(),
                refreshToken,
                clientId,
                clientSecret)
                .execute();
        return response.getAccessToken();
    }

    private MimeMessage createEmail(String to, String from, String subject, String nombreUsuario, String tokenVerificacion) throws Exception {
        Properties props = new Properties();
        Session session = Session.getDefaultInstance(props, null);

        MimeMessage email = new MimeMessage(session);
        email.setFrom(new InternetAddress(from));
        email.addRecipient(jakarta.mail.Message.RecipientType.TO, new InternetAddress(to));
        email.setSubject(subject);

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

        email.setContent(contenidoHtml, "text/html; charset=utf-8");
        return email;
    }

    private void sendMessage(String accessToken, String userId, MimeMessage emailContent) throws Exception {
        Gmail service = new Gmail.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                request -> request.getHeaders().setAuthorization("Bearer " + accessToken))
                .setApplicationName("TutoriasApp")
                .build();

        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        emailContent.writeTo(buffer);
        byte[] bytes = buffer.toByteArray();
        String encodedEmail = Base64.encodeBase64URLSafeString(bytes);
        Message message = new Message();
        message.setRaw(encodedEmail);

        service.users().messages().send(userId, message).execute();
    }
}
