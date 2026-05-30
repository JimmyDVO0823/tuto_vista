package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.time.OffsetDateTime;
import java.util.List;

/**
 * DTO que representa una conversación de chat.
 * Incluye los participantes involucrados y el último mensaje enviado para previsualización.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversacionDTO {
    private Long id;
    private OffsetDateTime creadoEn;
    private List<PerfilDTO> participantes;
    private MensajeDTO ultimoMensaje;
}
