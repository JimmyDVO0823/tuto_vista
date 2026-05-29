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
 * Controller for handling real-time chat messages via WebSockets.
 * Listens for messages on application-defined endpoints and broadcasts
 * them to the relevant topics.
 */
@Controller
@RequiredArgsConstructor
public class ChatWSController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * Handles incoming messages to a specific conversation.
     * Persistence is handled via ChatService, and then the message is
     * broadcasted to all subscribers of that conversation's topic.
     * 
     * @param convId The ID of the conversation.
     * @param mensajeDTO The message payload (should contain remitenteId and contenido).
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
