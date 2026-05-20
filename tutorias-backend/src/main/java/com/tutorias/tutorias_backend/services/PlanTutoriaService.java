package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.PlanTutoriaDTO;
import com.tutorias.tutorias_backend.entities.PlanTutoria;
import com.tutorias.tutorias_backend.entities.Tutor;
import com.tutorias.tutorias_backend.repositories.PlanTutoriaRepository;
import com.tutorias.tutorias_backend.repositories.TutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlanTutoriaService {

    private final PlanTutoriaRepository planTutoriaRepository;
    private final TutorRepository tutorRepository;

    public List<PlanTutoriaDTO> findAll() {
        return planTutoriaRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<PlanTutoriaDTO> findByTutor(Long tutorId) {
        return planTutoriaRepository.findByTutorId(tutorId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public PlanTutoriaDTO create(PlanTutoriaDTO dto) {
        Tutor tutor = tutorRepository.findById(dto.getTutorId())
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));

        PlanTutoria plan = PlanTutoria.builder()
                .tutor(tutor)
                .nombre(dto.getNombre())
                .descripcion(dto.getDescripcion())
                .totalSesiones(dto.getTotalSesiones())
                .duracionSesion(dto.getDuracionSesion() != null ? dto.getDuracionSesion() : 90)
                .precioTotal(dto.getPrecioTotal())
                .duracionPlanDias(dto.getDuracionPlanDias())
                .estaActivo(dto.getEstaActivo() != null ? dto.getEstaActivo() : true)
                .build();

        return mapToDTO(planTutoriaRepository.save(plan));
    }

    private PlanTutoriaDTO mapToDTO(PlanTutoria entity) {
        return PlanTutoriaDTO.builder()
                .id(entity.getId())
                .tutorId(entity.getTutor().getId())
                .nombre(entity.getNombre())
                .descripcion(entity.getDescripcion())
                .totalSesiones(entity.getTotalSesiones())
                .duracionSesion(entity.getDuracionSesion())
                .precioTotal(entity.getPrecioTotal())
                .duracionPlanDias(entity.getDuracionPlanDias())
                .estaActivo(entity.getEstaActivo())
                .creadoEn(entity.getCreadoEn())
                .build();
    }
}
