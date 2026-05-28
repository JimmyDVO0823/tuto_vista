package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.time.OffsetDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentMateriaDTO {
    private Long materiaId;
    private String nombre;
    private String departamento;
    private String tutor;
    private OffsetDateTime proximaSesion;
    private double progreso;
    private long sesionesDictadas; // Mapeado a actividades completadas
    private long sesionesPendientes; // Mapeado a actividades pendientes
    private boolean activo;
    private String sem;
}
