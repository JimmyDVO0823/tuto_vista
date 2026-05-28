package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.NotificationResponseDTO;
import com.tutorias.tutorias_backend.services.NotificacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notificaciones")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificacionController {

    private final NotificacionService notificacionService;

    @GetMapping("/unread/{perfilId}")
    public ResponseEntity<List<NotificationResponseDTO>> getUnread(@PathVariable Long perfilId) {
        // En una implementación real, el perfilId se obtendría del SecurityContext
        return ResponseEntity.ok(notificacionService.getNotificationsByUserId(perfilId).stream()
                .filter(n -> !n.isLeida())
                .toList());
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        notificacionService.marcarComoLeida(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/read-all/{perfilId}")
    public ResponseEntity<Void> markAllAsRead(@PathVariable Long perfilId) {
        notificacionService.marcarTodasComoLeidas(perfilId);
        return ResponseEntity.noContent().build();
    }
}
