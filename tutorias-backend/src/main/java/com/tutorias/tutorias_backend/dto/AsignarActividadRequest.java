package com.tutorias.tutorias_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
