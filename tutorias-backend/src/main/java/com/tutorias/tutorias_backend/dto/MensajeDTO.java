package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MensajeDTO {
    private Long id;
    private Long conversacionId;
    private Long remitenteId;
    private String remitenteNombre;
    private String contenido;
    private Boolean leido;
    private OffsetDateTime creadoEn;
}
