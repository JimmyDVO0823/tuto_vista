package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.DisponibilidadDTO;
import com.tutorias.tutorias_backend.entities.Disponibilidad;
import com.tutorias.tutorias_backend.entities.Tutor;
import com.tutorias.tutorias_backend.repositories.DisponibilidadRepository;
import com.tutorias.tutorias_backend.repositories.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DisponibilidadService {

    @Autowired
    private DisponibilidadRepository disponibilidadRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @Transactional(readOnly = true)
    public List<DisponibilidadDTO> getDisponibilidadByTutor(Long tutorId) {
        return disponibilidadRepository.findByTutorId(tutorId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public DisponibilidadDTO createDisponibilidad(DisponibilidadDTO dto) {
        Tutor tutor = tutorRepository.findById(dto.getTutorId())
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));

        Disponibilidad disponibilidad = new Disponibilidad();
        disponibilidad.setTutor(tutor);
        disponibilidad.setDiaSemana(dto.getDiaSemana());
        disponibilidad.setHoraInicio(dto.getHoraInicio());
        disponibilidad.setHoraFin(dto.getHoraFin());
        disponibilidad.setEstaActivo(dto.getEstaActivo() != null ? dto.getEstaActivo() : true);

        disponibilidad = disponibilidadRepository.save(disponibilidad);
        return toDTO(disponibilidad);
    }

    @Transactional
    public void deleteDisponibilidad(Long id) {
        disponibilidadRepository.deleteById(id);
    }

    private DisponibilidadDTO toDTO(Disponibilidad entity) {
        DisponibilidadDTO dto = new DisponibilidadDTO();
        dto.setId(entity.getId());
        dto.setTutorId(entity.getTutor().getId());
        dto.setDiaSemana(entity.getDiaSemana());
        dto.setHoraInicio(entity.getHoraInicio());
        dto.setHoraFin(entity.getHoraFin());
        dto.setEstaActivo(entity.getEstaActivo());
        return dto;
    }
}
