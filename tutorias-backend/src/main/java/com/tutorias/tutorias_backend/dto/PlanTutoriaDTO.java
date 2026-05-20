package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanTutoriaDTO {
    private Long id;
    private Long tutorId;
    private String nombre;
    private String descripcion;
    private Integer totalSesiones;
    private Integer duracionSesion;
    private BigDecimal precioTotal;
    private Integer duracionPlanDias;
    private Boolean estaActivo;
    private OffsetDateTime creadoEn;
}
