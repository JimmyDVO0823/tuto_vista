package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.ResenaCreateRequest;
import com.tutorias.tutorias_backend.dto.ResenaDTO;
import com.tutorias.tutorias_backend.entities.*;
import com.tutorias.tutorias_backend.repositories.EstudianteRepository;
import com.tutorias.tutorias_backend.repositories.ResenaRepository;
import com.tutorias.tutorias_backend.repositories.SesionTutoriaRepository;
import com.tutorias.tutorias_backend.repositories.TutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResenaService {

    private final ResenaRepository resenaRepository;
    private final SesionTutoriaRepository sesionTutoriaRepository;
    private final TutorRepository tutorRepository;
    private final EstudianteRepository estudianteRepository;

    @Transactional
    public ResenaDTO crear(ResenaCreateRequest request) {
        Resena resena = new Resena();
        
        if (request.getSesionId() != null) {
            SesionTutoria sesion = sesionTutoriaRepository.findById(request.getSesionId())
                    .orElseThrow(() -> new RuntimeException("Sesión no encontrada"));
            resena.setSesion(sesion);
            resena.setEstudiante(sesion.getEstudiante());
            resena.setTutor(sesion.getTutor());
        } else {
            Tutor tutor = tutorRepository.findById(request.getTutorId())
                    .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));
            Estudiante estudiante = estudianteRepository.findById(request.getEstudianteId())
                    .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));
            resena.setTutor(tutor);
            resena.setEstudiante(estudiante);
        }

        resena.setPuntuacion(request.getPuntuacion());
        resena.setComentario(request.getComentario());

        return toDTO(resenaRepository.save(resena));
    }

    public List<ResenaDTO> getByTutor(Long tutorId) {
        return resenaRepository.findByTutorId(tutorId)
                .stream().map(this::toDTO).toList();
    }

    private ResenaDTO toDTO(Resena r) {
        return ResenaDTO.builder()
                .id(r.getId())
                .sesionId(r.getSesion() != null ? r.getSesion().getId() : null)
                .estudianteId(r.getEstudiante().getId())
                .estudianteNombre(r.getEstudiante().getPerfil().getNombreCompleto())
                .tutorId(r.getTutor().getId())
                .puntuacion(r.getPuntuacion())
                .comentario(r.getComentario())
                .creadoEn(r.getCreadoEn())
                .build();
    }
}
