package com.tutorias.tutorias_backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;

/**
 * DTO para la actualización del perfil de un tutor.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorUpdateDTO {

    private String biografia;
    
    private String frase_personal;

    private BigDecimal precio_por_hora;

    private Integer anios_experiencia;

    private Integer duracion_sesion_min;

    private String[] titulos;

    private String[] logros;
}
