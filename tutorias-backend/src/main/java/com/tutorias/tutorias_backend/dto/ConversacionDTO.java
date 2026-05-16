package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversacionDTO {
    private Long id;
    private OffsetDateTime creadoEn;
    private List<Long> participantesIds;
    private MensajeDTO ultimoMensaje;
}
