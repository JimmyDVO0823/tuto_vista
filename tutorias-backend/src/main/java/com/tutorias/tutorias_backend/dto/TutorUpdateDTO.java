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

    @NotNull(message = "El precio por hora es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio por hora debe ser mayor a cero")
    private BigDecimal precio_por_hora;

    @NotNull(message = "Los años de experiencia son obligatorios")
    private Integer anios_experiencia;

    @NotNull(message = "La duración de sesión es obligatoria")
    private Integer duracion_sesion_min;

    private String[] titulos;

    private String[] logros;
}
