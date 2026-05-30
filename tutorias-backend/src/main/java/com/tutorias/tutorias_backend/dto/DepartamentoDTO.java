package com.tutorias.tutorias_backend.dto;

import lombok.*;

/**
 * DTO que representa un departamento académico.
 * Contiene el identificador y el nombre del departamento.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartamentoDTO {
    private Long id;
    private String nombre;
}
