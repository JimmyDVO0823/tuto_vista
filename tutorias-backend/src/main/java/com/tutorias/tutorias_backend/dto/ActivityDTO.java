package com.tutorias.tutorias_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para representar una actividad individual dentro del progreso semestral de un estudiante.
 * Contiene la etiqueta de la actividad y su estado de finalización.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityDTO {
    private String label;
    private boolean completed;
}
