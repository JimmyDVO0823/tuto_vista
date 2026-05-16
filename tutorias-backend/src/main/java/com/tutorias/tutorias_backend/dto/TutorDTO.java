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
    private String nombre_completo;
    private String url_avatar;
    private String biografia;
    private String frase_personal;
    private BigDecimal precio_por_hora;
    private BigDecimal calificacion_promedio;
    private Integer total_sesiones;
    private Integer anios_experiencia;
    private Boolean esta_disponible;
    private String[] titulos;
    private String[] logros;
    private List<MateriaDTO> materias;
}
