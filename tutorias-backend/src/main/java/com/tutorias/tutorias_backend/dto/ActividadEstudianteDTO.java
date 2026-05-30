package com.tutorias.tutorias_backend.dto;

import com.tutorias.tutorias_backend.enums.EstadoActividad;
import lombok.*;

/**
 * DTO que representa la información de una actividad asignada a un estudiante.
 * Se utiliza para transferir detalles de la actividad, el recurso asociado y el estado actual.
 */
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
