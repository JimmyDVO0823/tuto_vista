package com.tutorias.tutorias_backend.dto;

import com.tutorias.tutorias_backend.enums.TipoRecurso;
import lombok.*;
import java.time.OffsetDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecursoDTO {
    private Long id;
    private Long tutorId;
    private Long materiaId;
    private String materiaNombre;
    private String titulo;
    private String descripcion;
    private String urlArchivo;
    private TipoRecurso tipo;
    private OffsetDateTime creadoEn;
}
