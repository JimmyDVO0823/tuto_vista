package com.tutorias.tutorias_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para las respuestas de notificaciones.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDTO {
    private Long id;
    private String user;
    private String msg;
    private String time;
    private String tipo;
    private boolean leida;
}
