package com.tutorias.tutorias_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MateriaDTO {
    private Long id;
    private String nombre;
    private Long departamento_id;
    private String departamento_nombre;
}
