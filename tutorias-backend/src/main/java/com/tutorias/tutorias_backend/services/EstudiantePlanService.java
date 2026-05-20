package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.EstudiantePlanDTO;
import com.tutorias.tutorias_backend.entities.Estudiante;
import com.tutorias.tutorias_backend.entities.EstudiantePlan;
import com.tutorias.tutorias_backend.entities.PlanTutoria;
import com.tutorias.tutorias_backend.repositories.EstudiantePlanRepository;
import com.tutorias.tutorias_backend.repositories.EstudianteRepository;
import com.tutorias.tutorias_backend.repositories.PlanTutoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EstudiantePlanService {

    private final EstudiantePlanRepository estudiantePlanRepository;
    private final EstudianteRepository estudianteRepository;
    private final PlanTutoriaRepository planTutoriaRepository;

    public List<EstudiantePlanDTO> findByEstudiante(Long estudianteId) {
        return estudiantePlanRepository.findByEstudianteId(estudianteId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public EstudiantePlanDTO create(EstudiantePlanDTO dto) {
        Estudiante estudiante = estudianteRepository.findById(dto.getEstudianteId())
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));
        PlanTutoria plan = planTutoriaRepository.findById(dto.getPlanId())
                .orElseThrow(() -> new RuntimeException("Plan no encontrado"));

        EstudiantePlan estudiantePlan = EstudiantePlan.builder()
                .estudiante(estudiante)
                .planTutoria(plan)
                .sesionesDisponibles(dto.getSesionesDisponibles())
                .fechaVencimiento(dto.getFechaVencimiento())
                .estado(dto.getEstado())
                .build();

        return mapToDTO(estudiantePlanRepository.save(estudiantePlan));
    }

    private EstudiantePlanDTO mapToDTO(EstudiantePlan entity) {
        return EstudiantePlanDTO.builder()
                .id(entity.getId())
                .estudianteId(entity.getEstudiante().getId())
                .planId(entity.getPlanTutoria().getId())
                .sesionesDisponibles(entity.getSesionesDisponibles())
                .fechaVencimiento(entity.getFechaVencimiento())
                .estado(entity.getEstado())
                .creadoEn(entity.getCreadoEn())
                .build();
    }
}
