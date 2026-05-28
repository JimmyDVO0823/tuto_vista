package com.tutorias.tutorias_backend.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    /**
     * Envía un correo electrónico en formato HTML para verificación de cuenta.
     */
    public void enviarCorreoVerificacion(String correoDestino, String nombreUsuario, String tokenVerificacion) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            // True indica que el correo contendrá elementos multimedia/HTML
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("acd9de001@smtp-brevo.com"); // El remitente
            helper.setTo(correoDestino);
            helper.setSubject("🔑 Verifica tu cuenta de Tutorías");

            // Construimos un diseño HTML elegante y académico
            String contenidoHtml = "<html><body style='font-family: Arial, sans-serif; color: #333;'>"
                    + "<div style='max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 12px;'>"
                    + "<h2 style='color: #002045;'>¡Bienvenido a nuestra Plataforma de Tutorías!</h2>"
                    + "<p>Hola, <strong>" + nombreUsuario + "</strong>,</p>"
                    + "<p>Gracias por registrarte. Para activar tu cuenta de tutor o estudiante y empezar a usar todos nuestros servicios, por favor haz clic en el siguiente enlace:</p>"
                    + "<div style='text-align: center; margin: 30px 0;'>"
                    + "  <a href='https://jimmydvo0823.github.io/tuto_vista/verified?token=" + tokenVerificacion + "' "
                    + "     style='background-color: #D4AF37; color: #002045; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;'>"
                    + "     Verificar Mi Correo"
                    + "  </a>"
                    + "</div>"
                    + "<p style='font-size: 12px; color: #666;'>Si tú no solicitaste este registro, puedes ignorar este mensaje pacíficamente.</p>"
                    + "</div>"
                    + "</body></html>";

            helper.setText(contenidoHtml, true); // El 'true' activa el renderizado de HTML

            mailSender.send(message);
            System.out.println("📧 Correo de verificación enviado con éxito a: " + correoDestino);

        } catch (MessagingException e) {
            System.err.println("❌ Falló el envío del correo electrónico: " + e.getMessage());
            throw new RuntimeException("Error al enviar el correo de verificación");
        }
    }
}
