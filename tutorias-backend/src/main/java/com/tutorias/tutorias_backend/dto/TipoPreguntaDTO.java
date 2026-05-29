package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TipoPreguntaDTO {
    private Long id;
    private String nombre;
    private String icono;
    private List<PreguntaDTO> preguntas;
}
