package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.ConversacionDTO;
import com.tutorias.tutorias_backend.dto.MensajeDTO;
import com.tutorias.tutorias_backend.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/conversacion")
    public ResponseEntity<ConversacionDTO> iniciar(@RequestParam Long p1, @RequestParam Long p2) {
        return ResponseEntity.ok(chatService.crearOObtenerConversacion(p1, p2));
    }

    @GetMapping("/conversaciones/{perfilId}")
    public ResponseEntity<List<ConversacionDTO>> listar(@PathVariable Long perfilId) {
        return ResponseEntity.ok(chatService.getConversaciones(perfilId));
    }

    @PostMapping("/mensaje")
    public ResponseEntity<MensajeDTO> enviar(
            @RequestParam Long convId, 
            @RequestParam Long remitenteId, 
            @RequestBody String contenido) {
        return ResponseEntity.ok(chatService.enviarMensaje(convId, remitenteId, contenido));
    }

    @GetMapping("/mensajes/{convId}")
    public ResponseEntity<List<MensajeDTO>> getMensajes(@PathVariable Long convId) {
        return ResponseEntity.ok(chatService.getMensajes(convId));
    }
}
