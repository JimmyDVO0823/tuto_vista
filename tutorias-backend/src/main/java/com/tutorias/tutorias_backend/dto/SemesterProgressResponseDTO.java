package com.tutorias.tutorias_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * DTO para la respuesta del progreso semestral.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SemesterProgressResponseDTO {
    private int completedCount;
    private int totalCount;
    private List<ActivityDTO> activities;
}
