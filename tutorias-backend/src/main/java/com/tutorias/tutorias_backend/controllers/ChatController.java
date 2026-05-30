package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.ConversacionDTO;
import com.tutorias.tutorias_backend.dto.MensajeDTO;
import com.tutorias.tutorias_backend.dto.MessageRequest;
import com.tutorias.tutorias_backend.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador REST para la mensajería instantánea.
 * Gestiona la creación de conversaciones y el envío/recuperación de mensajes.
 */
@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    /**
     * Inicia o recupera una conversación existente entre dos participantes.
     *
     * @param p1 Identificador del primer participante.
     * @param p2 Identificador del segundo participante.
     * @return ResponseEntity con los detalles de la conversación.
     */
    @PostMapping("/conversacion")
    public ResponseEntity<ConversacionDTO> iniciar(@RequestParam Long p1, @RequestParam Long p2) {
        return ResponseEntity.ok(chatService.crearOObtenerConversacion(p1, p2));
    }

    /**
     * Lista todas las conversaciones activas para un perfil específico.
     *
     * @param perfilId Identificador del perfil.
     * @return ResponseEntity con la lista de conversaciones.
     */
    @GetMapping("/conversaciones/{perfilId}")
    public ResponseEntity<List<ConversacionDTO>> listar(@PathVariable Long perfilId) {
        return ResponseEntity.ok(chatService.getConversaciones(perfilId));
    }

    /**
     * Envía un mensaje dentro de una conversación.
     *
     * @param convId Identificador de la conversación.
     * @param remitenteId Identificador del perfil que envía el mensaje.
     * @param request Cuerpo de la petición con el contenido del mensaje.
     * @return ResponseEntity con los detalles del mensaje enviado.
     */
    @PostMapping("/mensaje")
    public ResponseEntity<MensajeDTO> enviar(
            @RequestParam Long convId, 
            @RequestParam Long remitenteId, 
            @RequestBody MessageRequest request) {
        return ResponseEntity.ok(chatService.enviarMensaje(convId, remitenteId, request.getContent()));
    }

    /**
     * Permite a un usuario abandonar una conversación.
     *
     * @param convId Identificador de la conversación.
     * @param perfilId Identificador del perfil que abandona la conversación.
     * @return ResponseEntity sin contenido indicando éxito.
     */
    @DeleteMapping("/conversacion/{convId}/{perfilId}")
    public ResponseEntity<Void> abandonar(@PathVariable Long convId, @PathVariable Long perfilId) {
        chatService.abandonarConversacion(convId, perfilId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Recupera el historial de mensajes de una conversación.
     *
     * @param convId Identificador de la conversación.
     * @return ResponseEntity con la lista de mensajes de la conversación.
     */
    @GetMapping("/mensajes/{convId}")
    public ResponseEntity<List<MensajeDTO>> getMensajes(@PathVariable Long convId) {
        return ResponseEntity.ok(chatService.getMensajes(convId));
    }
}
