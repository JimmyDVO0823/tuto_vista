package com.tutorias.tutorias_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResenaCreateRequest {
    private Long sesionId; // Opcional
    private Long tutorId;   // Obligatorio para reseñas generales
    private Long estudianteId; // Obligatorio
    private BigDecimal puntuacion;
    private String comentario;
}
