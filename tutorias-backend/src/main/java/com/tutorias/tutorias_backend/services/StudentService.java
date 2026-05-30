package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.ActivityDTO;
import com.tutorias.tutorias_backend.dto.SemesterProgressResponseDTO;
import com.tutorias.tutorias_backend.dto.StudentMateriaDTO;
import com.tutorias.tutorias_backend.entities.ActividadEstudiante;
import com.tutorias.tutorias_backend.entities.SesionTutoria;
import com.tutorias.tutorias_backend.enums.EstadoActividad;
import com.tutorias.tutorias_backend.enums.EstadoSesion;
import com.tutorias.tutorias_backend.repositories.ActividadEstudianteRepository;
import com.tutorias.tutorias_backend.repositories.SesionTutoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.tutorias.tutorias_backend.dto.StudentStatsDTO;
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
    private final ActividadEstudianteRepository actividadEstudianteRepository;

    /**
     * Obtiene estadísticas globales para el dashboard del estudiante.
     * @param studentId ID del estudiante.
     * @return StudentStatsDTO con conteo de sesiones, cursos y progreso.
     */
    public StudentStatsDTO getDashboardStats(Long studentId) {
        OffsetDateTime now = OffsetDateTime.now();
        List<SesionTutoria> allSessions = sesionTutoriaRepository.findByEstudianteId(studentId);

        int upcomingSessionsCount = (int) allSessions.stream()
                .filter(s -> s.getEstado() == EstadoSesion.programada && s.getProgramadaPara().isAfter(now))
                .count();

        // Cursos activos (materias únicas con sesiones no canceladas)
        int activeCoursesCount = (int) allSessions.stream()
                .filter(s -> s.getEstado() != EstadoSesion.cancelada)
                .map(s -> s.getMateria().getId())
                .distinct()
                .count();

        // Progreso semestral (usamos el de sesiones por defecto)
        SemesterProgressResponseDTO progress = getSessionsProgress(studentId);
        double progressPercentage = progress.getTotalCount() > 0 
                ? (progress.getCompletedCount() * 100.0 / progress.getTotalCount()) 
                : 0.0;

        return StudentStatsDTO.builder()
                .upcomingSessionsCount(upcomingSessionsCount)
                .activeCoursesCount(activeCoursesCount)
                .notificationCount(0) // TODO: Integrar con NotificacionRepository
                .semesterProgress(progressPercentage)
                .build();
    }

    /**
     * Calcula el progreso del semestre basado en sesiones de tutoría.
     * @param studentId ID del estudiante.
     * @return SemesterProgressResponseDTO con el detalle de actividades.
     */
    public SemesterProgressResponseDTO getSessionsProgress(Long studentId) {
        OffsetDateTime[] range = getSemesterRange();
        List<SesionTutoria> sessions = sesionTutoriaRepository.findSessionsByStudentInDateRange(studentId, range[0], range[1]);

        // Filtrar según lo solicitado: programadas, en progreso o completadas (excluye canceladas y no asistio)
        List<SesionTutoria> relevantSessions = sessions.stream()
                .filter(s -> s.getEstado() == EstadoSesion.programada || 
                            s.getEstado() == EstadoSesion.en_progreso || 
                            s.getEstado() == EstadoSesion.completada)
                .collect(Collectors.toList());

        int totalCount = relevantSessions.size();
        int completedCount = (int) relevantSessions.stream()
                .filter(s -> s.getEstado() == EstadoSesion.completada)
                .count();

        List<ActivityDTO> activities = relevantSessions.stream()
                .map(s -> ActivityDTO.builder()
                        .label("Tutoria: " + s.getMateria().getNombre())
                        .completed(s.getEstado() == EstadoSesion.completada)
                        .build())
                .collect(Collectors.toList());

        return SemesterProgressResponseDTO.builder()
                .totalCount(totalCount)
                .completedCount(completedCount)
                .activities(activities)
                .build();
    }

    public SemesterProgressResponseDTO getActivitiesProgress(Long studentId) {
        // Obtenemos todas las actividades del estudiante
        List<ActividadEstudiante> activities = actividadEstudianteRepository.findByEstudianteId(studentId);

        int totalCount = activities.size();
        int completedCount = (int) activities.stream()
                .filter(a -> a.getEstado() == EstadoActividad.completado)
                .count();

        List<ActivityDTO> activityDTOs = activities.stream()
                .map(a -> ActivityDTO.builder()
                        .label(a.getSesion().getMateria().getNombre() + ": " + 
                                (a.getRecurso() != null ? a.getRecurso().getTitulo() : "Sin título"))
                        .completed(a.getEstado() == EstadoActividad.completado)
                        .build())
                .collect(Collectors.toList());

        return SemesterProgressResponseDTO.builder()
                .totalCount(totalCount)
                .completedCount(completedCount)
                .activities(activityDTOs)
                .build();
    }

    private OffsetDateTime[] getSemesterRange() {
        LocalDate today = LocalDate.now();
        int year = today.getYear();
        int month = today.getMonthValue();
        OffsetDateTime start, end;

        if (month <= 6) {
            start = OffsetDateTime.of(LocalDateTime.of(LocalDate.of(year, 1, 1), LocalTime.MIN), ZoneOffset.UTC);
            end = OffsetDateTime.of(LocalDateTime.of(LocalDate.of(year, 6, 30), LocalTime.MAX), ZoneOffset.UTC);
        } else {
            start = OffsetDateTime.of(LocalDateTime.of(LocalDate.of(year, 7, 1), LocalTime.MIN), ZoneOffset.UTC);
            end = OffsetDateTime.of(LocalDateTime.of(LocalDate.of(year, 12, 31), LocalTime.MAX), ZoneOffset.UTC);
        }
        return new OffsetDateTime[]{start, end};
    }

    public SemesterProgressResponseDTO getSemesterProgress(Long studentId) {
        // Redirigir al nuevo método de sesiones por defecto para compatibilidad
        return getSessionsProgress(studentId);
    }

    /**
     * Obtiene la lista de materias en las que el estudiante tiene tutorías activas.
     * Calcula el progreso individual por materia basado en las actividades.
     * @param studentId ID del estudiante.
     * @return Lista de StudentMateriaDTO.
     */
    public List<StudentMateriaDTO> getStudentMaterias(Long studentId) {
        // 1. Obtener todas las sesiones de tutoría asociadas al estudiante que no estén canceladas
        List<SesionTutoria> sessions = sesionTutoriaRepository.findByEstudianteId(studentId);
        List<SesionTutoria> activeSessions = sessions.stream()
                .filter(s -> s.getEstado() != EstadoSesion.cancelada)
                .collect(Collectors.toList());

        // 2. Obtener todas las actividades del estudiante para calcular el progreso de cada una
        List<ActividadEstudiante> allActivities = actividadEstudianteRepository.findByEstudianteId(studentId);

        OffsetDateTime now = OffsetDateTime.now();

        // 3. Agrupar sesiones por combinación única de (materiaId, tutorId)
        return activeSessions.stream()
                .collect(Collectors.groupingBy(s -> List.of(s.getMateria().getId(), s.getTutor().getId())))
                .entrySet().stream()
                .map(entry -> {
                    List<Long> key = entry.getKey();
                    Long materiaId = key.get(0);
                    Long tutorId = key.get(1);
                    List<SesionTutoria> groupSessions = entry.getValue();

                    // Obtenemos información base del primer elemento del grupo
                    SesionTutoria firstSession = groupSessions.get(0);
                    String materiaNombre = firstSession.getMateria().getNombre();
                    String deptoNombre = firstSession.getMateria().getDepartamento().getNombre();
                    String tutorNombre = firstSession.getTutor().getPerfil().getNombreCompleto();

                    // Próxima sesión (la fecha programada más cercana en el futuro)
                    OffsetDateTime nextSession = groupSessions.stream()
                            .filter(s -> s.getProgramadaPara().isAfter(now))
                            .map(SesionTutoria::getProgramadaPara)
                            .min(OffsetDateTime::compareTo)
                            .orElse(null);

                    // Filtrar actividades asociadas a este tutor y esta materia
                    List<ActividadEstudiante> groupActivities = allActivities.stream()
                            .filter(a -> a.getSesion() != null 
                                    && a.getSesion().getMateria().getId().equals(materiaId)
                                    && a.getSesion().getTutor().getId().equals(tutorId))
                            .collect(Collectors.toList());

                    long completedCount = groupActivities.stream()
                            .filter(a -> a.getEstado() == EstadoActividad.completado)
                            .count();
                    long totalCount = groupActivities.size();

                    double progreso = totalCount > 0 ? (completedCount * 100.0 / totalCount) : 0.0;

                    return StudentMateriaDTO.builder()
                            .materiaId(materiaId)
                            .nombre(materiaNombre)
                            .departamento(deptoNombre)
                            .tutor(tutorNombre)
                            .proximaSesion(nextSession)
                            .progreso(progreso)
                            .sesionesDictadas(completedCount)
                            .sesionesPendientes(totalCount - completedCount)
                            .activo(true)
                            .sem("2024-A")
                            .build();
                })
                .collect(Collectors.toList());
    }
}
