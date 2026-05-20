package com.tutorias.tutorias_backend.dto;

import com.tutorias.tutorias_backend.enums.EstadoReporte;
import com.tutorias.tutorias_backend.enums.MotivoReporte;
import lombok.*;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReporteDTO {
    private Long id;
    private Long reportadoPorId;
    private Long reportadoAId;
    private Long sesionId;
    private MotivoReporte motivo;
    private String descripcion;
    private EstadoReporte estado;
    private OffsetDateTime creadoEn;
}
