package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.MateriaDTO;
import com.tutorias.tutorias_backend.dto.TutorDTO;
import com.tutorias.tutorias_backend.entities.Tutor;
import com.tutorias.tutorias_backend.repositories.TutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TutorService {

    private final TutorRepository tutorRepository;
    private final com.tutorias.tutorias_backend.repositories.MateriaRepository materiaRepository;
    private final com.tutorias.tutorias_backend.repositories.SesionTutoriaRepository sesionTutoriaRepository;
    private final com.tutorias.tutorias_backend.repositories.PagoRepository pagoRepository;
    private final com.tutorias.tutorias_backend.repositories.ResenaRepository resenaRepository;

    /**
     * Obtiene estadísticas calculadas en tiempo real para el dashboard del tutor.
     */
    public com.tutorias.tutorias_backend.dto.TutorStatsDTO getTutorStats(Long tutorId) {
        java.time.OffsetDateTime now = java.time.OffsetDateTime.now();
        java.time.OffsetDateTime startOfMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        
        java.time.OffsetDateTime startOfLastMonth = startOfMonth.minusMonths(1);
        java.time.OffsetDateTime startOfCurrentMonth = startOfMonth;

        // 1. Horas dictadas este mes
        Long totalMin = sesionTutoriaRepository.sumDuracionMinByTutorAndMonth(tutorId, startOfMonth);
        Double hoursThisMonth = totalMin != null ? totalMin / 60.0 : 0.0;

        // 2. Calificación promedio
        Double averageRating = resenaRepository.avgPuntuacionByTutorId(tutorId);
        if (averageRating == null) {
            Tutor tutor = tutorRepository.findById(tutorId).orElse(null);
            averageRating = tutor != null ? tutor.getCalificacionPromedio().doubleValue() : 0.0;
        }

        // 3. Ingresos el mes pasado
        BigDecimal incomeLastMonth = pagoRepository.sumPagoTutorByTutorAndLastMonth(tutorId, startOfLastMonth, startOfCurrentMonth);
        if (incomeLastMonth == null) incomeLastMonth = BigDecimal.ZERO;

        return new com.tutorias.tutorias_backend.dto.TutorStatsDTO(hoursThisMonth, averageRating, incomeLastMonth);
    }

    /**
     * Asigna una materia a un tutor.
     */
    @org.springframework.transaction.annotation.Transactional
    public void asignarMateria(Long tutorId, Long materiaId) {
        Tutor tutor = tutorRepository.findById(tutorId)
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));
        com.tutorias.tutorias_backend.entities.Materia materia = materiaRepository.findById(materiaId)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada"));

        if (!tutor.getMaterias().contains(materia)) {
            tutor.getMaterias().add(materia);
            tutorRepository.save(tutor);
        }
    }

    /**
     * Obtiene un tutor por su ID.
     */
    public TutorDTO getTutorById(Long id) {
        Tutor tutor = tutorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));
        return toDTO(tutor);
    }

    /**
     * Obtiene todos los tutores disponibles con filtros opcionales.
     */
    public List<TutorDTO> getTutoresDisponibles(
            BigDecimal minPrecio,
            BigDecimal maxPrecio,
            BigDecimal minCalificacion,
            Long materiaId,
            Long departamentoId
    ) {
        return tutorRepository.findAll().stream()
                .filter(t -> t.getEstaDisponible())
                .filter(t -> minPrecio == null || t.getPrecioPorHora().compareTo(minPrecio) >= 0)
                .filter(t -> maxPrecio == null || t.getPrecioPorHora().compareTo(maxPrecio) <= 0)
                .filter(t -> minCalificacion == null || t.getCalificacionPromedio().compareTo(minCalificacion) >= 0)
                .filter(t -> materiaId == null || t.getMaterias().stream()
                        .anyMatch(m -> m.getId().equals(materiaId)))
                .filter(t -> departamentoId == null || t.getMaterias().stream()
                        .anyMatch(m -> m.getDepartamento().getId().equals(departamentoId)))
                .map(this::toDTO)
                .toList();
    }

    /**
     * Obtiene las materias asignadas a un tutor específico.
     */
    public List<MateriaDTO> getMateriasByTutor(Long tutorId) {
        Tutor tutor = tutorRepository.findById(tutorId)
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));

        return tutor.getMaterias().stream()
                .map(m -> MateriaDTO.builder()
                        .id(m.getId())
                        .nombre(m.getNombre())
                        .departamento_id(m.getDepartamento().getId())
                        .departamento_nombre(m.getDepartamento().getNombre())
                        .build())
                .toList();
    }

    /**
     * Mapeador de Tutor entidad a TutorDTO.
     */
    private TutorDTO toDTO(Tutor t) {
        List<MateriaDTO> materiasDTO = t.getMaterias() == null ? List.of() :
                t.getMaterias().stream()
                        .map(m -> MateriaDTO.builder()
                                .id(m.getId())
                                .nombre(m.getNombre())
                                .departamento_id(m.getDepartamento().getId())
                                .departamento_nombre(m.getDepartamento().getNombre())
                                .build())
                        .toList();

        return TutorDTO.builder()
                .id(t.getId())
                .nombre_completo(t.getPerfil().getNombreCompleto())
                .url_avatar(t.getPerfil().getUrlAvatar())
                .biografia(t.getBiografia())
                .frase_personal(t.getFrasePersonal())
                .precio_por_hora(t.getPrecioPorHora())
                .calificacion_promedio(t.getCalificacionPromedio())
                .total_sesiones(t.getTotalSesiones())
                .anios_experiencia(t.getAniosExperiencia())
                .esta_disponible(t.getEstaDisponible())
                .titulos(t.getTitulos())
                .logros(t.getLogros())
                .materias(materiasDTO)
                .build();
    }
}
