package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResenaDTO {
    private Long id;
    private Long sesionId;
    private Long estudianteId;
    private String estudianteNombre;
    private Long tutorId;
    private BigDecimal puntuacion;
    private String comentario;
    private OffsetDateTime creadoEn;
}
