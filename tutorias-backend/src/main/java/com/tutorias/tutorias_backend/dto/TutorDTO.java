package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorDTO {
    private Long id;
    private String nombreCompleto;
    private String urlAvatar;
    private String biografia;
    private String frasePersonal;
    private BigDecimal precioPorHora;
    private BigDecimal calificacionPromedio;
    private Integer totalSesiones;
    private Integer aniosExperiencia;
    private Boolean estaDisponible;
    private String[] titulos;
    private String[] logros;
    private List<MateriaDTO> materias;
}
