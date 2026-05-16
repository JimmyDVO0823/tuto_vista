package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.ResenaDTO;
import com.tutorias.tutorias_backend.entities.*;
import com.tutorias.tutorias_backend.repositories.ResenaRepository;
import com.tutorias.tutorias_backend.repositories.SesionTutoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResenaService {

    private final ResenaRepository resenaRepository;
    private final SesionTutoriaRepository sesionTutoriaRepository;

    @Transactional
    public ResenaDTO crear(Long sesionId, BigDecimal puntuacion, String comentario) {
        SesionTutoria sesion = sesionTutoriaRepository.findById(sesionId)
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada"));

        Resena resena = new Resena();
        resena.setSesion(sesion);
        resena.setEstudiante(sesion.getEstudiante());
        resena.setTutor(sesion.getTutor());
        resena.setPuntuacion(puntuacion);
        resena.setComentario(comentario);

        return toDTO(resenaRepository.save(resena));
    }

    public List<ResenaDTO> getByTutor(Long tutorId) {
        return resenaRepository.findByTutorId(tutorId)
                .stream().map(this::toDTO).toList();
    }

    private ResenaDTO toDTO(Resena r) {
        return ResenaDTO.builder()
                .id(r.getId())
                .sesionId(r.getSesion().getId())
                .estudianteId(r.getEstudiante().getId())
                .estudianteNombre(r.getEstudiante().getPerfil().getNombreCompleto())
                .tutorId(r.getTutor().getId())
                .puntuacion(r.getPuntuacion())
                .comentario(r.getComentario())
                .creadoEn(r.getCreadoEn())
                .build();
    }
}
