package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolicitudRequest {
    private Long tutorId;
    private Long materiaId;
    private LocalDate fechaPreferida;
    private LocalTime horaPreferida;
    private Integer duracionMin;
    private String mensaje;
}
