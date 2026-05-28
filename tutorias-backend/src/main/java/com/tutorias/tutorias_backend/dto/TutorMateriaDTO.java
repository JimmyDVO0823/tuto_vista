package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorMateriaDTO {
    private Long materiaId;
    private String nombre;
    private String departamento;
    private Boolean activo;
    private Double progreso;
    private OffsetDateTime proximaSesion;
    private Long sesionesDictadas;
    private Long sesionesPendientes;
}
