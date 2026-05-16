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
