package com.tutorias.tutorias_backend.dto;

import com.tutorias.tutorias_backend.enums.EstadoEstudiantePlan;
import lombok.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstudiantePlanDTO {
    private Long id;
    private Long estudianteId;
    private Long planId;
    private Integer sesionesDisponibles;
    private LocalDate fechaVencimiento;
    private EstadoEstudiantePlan estado;
    private OffsetDateTime creadoEn;
}
