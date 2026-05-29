package com.tutorias.tutorias_backend.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PreguntaDTO {
    private Long id;
    private Long tipoId;
    private String pregunta;
    private String respuesta;
}
