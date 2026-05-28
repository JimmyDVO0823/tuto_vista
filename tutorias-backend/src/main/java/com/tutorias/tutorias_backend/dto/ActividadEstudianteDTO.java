package com.tutorias.tutorias_backend.dto;

import com.tutorias.tutorias_backend.enums.EstadoActividad;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActividadEstudianteDTO {
    private Long id;
    private Long recursoId;
    private String recursoTitulo;
    private String recursoUrl;
    private Long estudianteId;
    private String estudianteNombre;
    private Long sesionId;
    private String sesionMateria;
    private EstadoActividad estado;
    private String comentarioTutor;
}
