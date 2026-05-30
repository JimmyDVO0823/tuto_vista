package com.tutorias.tutorias_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO que representa una solicitud para asignar una actividad a un estudiante.
 * Incluye el identificador de la sesión, detalles del recurso opcional y la descripción de la tarea.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AsignarActividadRequest {
    private Long sesionId;
    private Long recursoId;
    private String titulo;
    private String url;
    private String urlArchivo;
    private String descripcion;
}
