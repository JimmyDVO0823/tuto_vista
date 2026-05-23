package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.ActivityDTO;
import com.tutorias.tutorias_backend.dto.SemesterProgressResponseDTO;
import com.tutorias.tutorias_backend.entities.SesionTutoria;
import com.tutorias.tutorias_backend.enums.EstadoSesion;
import com.tutorias.tutorias_backend.repositories.SesionTutoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para manejar la lógica de negocio específica de los estudiantes.
 */
@Service
@RequiredArgsConstructor
public class StudentService {

    private final SesionTutoriaRepository sesionTutoriaRepository;

    public SemesterProgressResponseDTO getSemesterProgress(Long studentId) {
        LocalDate today = LocalDate.now();
        int year = today.getYear();
        int month = today.getMonthValue();

        OffsetDateTime start;
        OffsetDateTime end;

        // Lógica de segmentación de semestres
        if (month <= 6) {
            start = OffsetDateTime.of(LocalDateTime.of(LocalDate.of(year, 1, 1), LocalTime.MIN), ZoneOffset.UTC);
            end = OffsetDateTime.of(LocalDateTime.of(LocalDate.of(year, 6, 30), LocalTime.MAX), ZoneOffset.UTC);
        } else {
            start = OffsetDateTime.of(LocalDateTime.of(LocalDate.of(year, 7, 1), LocalTime.MIN), ZoneOffset.UTC);
            end = OffsetDateTime.of(LocalDateTime.of(LocalDate.of(year, 12, 31), LocalTime.MAX), ZoneOffset.UTC);
        }

        List<SesionTutoria> sessions = sesionTutoriaRepository.findSessionsByStudentInDateRange(studentId, start, end);

        int totalCount = sessions.size();
        int completedCount = (int) sessions.stream()
                .filter(s -> s.getEstado() == EstadoSesion.completada)
                .count();

        List<ActivityDTO> activities = sessions.stream()
                .map(s -> ActivityDTO.builder()
                        .label(s.getMateria().getNombre() + " - " + s.getTutor().getPerfil().getNombreCompleto())
                        .completed(s.getEstado() == EstadoSesion.completada)
                        .build())
                .collect(Collectors.toList());

        return SemesterProgressResponseDTO.builder()
                .totalCount(totalCount)
                .completedCount(completedCount)
                .activities(activities)
                .build();
    }
}
