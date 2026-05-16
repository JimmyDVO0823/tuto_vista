package com.tutorias.tutorias_backend.dto;

import com.tutorias.tutorias_backend.enums.EstadoSolicitud;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolicitudDTO {
    private Long id;
    private Long estudianteId;
    private String estudianteNombre;
    private Long tutorId;
    private String tutorNombre;
    private Long materiaId;
    private String materiaNombre;
    private LocalDate fechaPreferida;
    private LocalTime horaPreferida;
    private Integer duracionMin;
    private String mensaje;
    private EstadoSolicitud estado;
    private OffsetDateTime creadoEn;
}
