package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.NotificationResponseDTO;
import com.tutorias.tutorias_backend.services.NotificacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador para operaciones generales de usuario.
 */
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final NotificacionService notificacionService;

    @GetMapping("/{id}/notifications")
    public ResponseEntity<List<NotificationResponseDTO>> getNotifications(@PathVariable Long id) {
        return ResponseEntity.ok(notificacionService.getNotificationsByUserId(id));
    }
}
