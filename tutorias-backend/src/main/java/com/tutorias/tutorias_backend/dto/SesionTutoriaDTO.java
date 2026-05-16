package com.tutorias.tutorias_backend.dto;

import com.tutorias.tutorias_backend.enums.EstadoSesion;
import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SesionTutoriaDTO {
    private Long id;
    private Long solicitudId;
    private Long tutorId;
    private String tutorNombre;
    private Long estudianteId;
    private String estudianteNombre;
    private Long materiaId;
    private String materiaNombre;
    private OffsetDateTime programadaPara;
    private Integer duracionMin;
    private BigDecimal precio;
    private String enlaceReunion;
    private EstadoSesion estado;
    private String motivoCancelacion;
    private OffsetDateTime creadoEn;
}
