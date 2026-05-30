package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.MensajeDTO;
import com.tutorias.tutorias_backend.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 * Controlador para la gestión de mensajes de chat en tiempo real mediante WebSockets.
 * Escucha mensajes en los endpoints definidos y los retransmite a los temas (topics) correspondientes.
 */
@Controller
@RequiredArgsConstructor
public class ChatWSController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * Procesa los mensajes entrantes para una conversación específica.
     * La persistencia se maneja a través de ChatService, y luego el mensaje se retransmite
     * a todos los suscriptores del tema de esa conversación.
     * 
     * @param convId Identificador de la conversación.
     * @param mensajeDTO Objeto con los datos del mensaje (remitenteId y contenido).
     */
    @MessageMapping("/chat/{convId}")
    public void processMessage(@DestinationVariable Long convId, @Payload MensajeDTO mensajeDTO) {
        // 1. Persist message in database via ChatService
        // We use the existing enviarMensaje method which already handles storage and notifications
        MensajeDTO savedMessage = chatService.enviarMensaje(
                convId, 
                mensajeDTO.getRemitenteId(), 
                mensajeDTO.getContenido()
        );

        // 2. Broadcast the message to the topic that the participants are listening to
        // Destination: /topic/messages/{convId}
        messagingTemplate.convertAndSend("/topic/messages/" + convId, savedMessage);
    }
}
