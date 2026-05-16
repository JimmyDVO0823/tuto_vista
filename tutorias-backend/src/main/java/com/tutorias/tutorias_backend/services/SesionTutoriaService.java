package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.SesionTutoriaDTO;
import com.tutorias.tutorias_backend.entities.*;
import com.tutorias.tutorias_backend.enums.EstadoSesion;
import com.tutorias.tutorias_backend.repositories.SesionTutoriaRepository;
import com.tutorias.tutorias_backend.repositories.SolicitudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SesionTutoriaService {

    private final SesionTutoriaRepository sesionTutoriaRepository;
    private final SolicitudRepository solicitudRepository;

    @Transactional
    public SesionTutoriaDTO crearDesdeSolicitud(Long solicitudId) {
        Solicitud solicitud = solicitudRepository.findById(solicitudId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        SesionTutoria sesion = new SesionTutoria();
        sesion.setSolicitud(solicitud);
        sesion.setTutor(solicitud.getTutor());
        sesion.setEstudiante(solicitud.getEstudiante());
        sesion.setMateria(solicitud.getMateria());
        
        // Combinar fecha y hora preferida para programar
        OffsetDateTime programada = OffsetDateTime.of(
            solicitud.getFechaPreferida(), 
            solicitud.getHoraPreferida(), 
            ZoneOffset.UTC
        );
        sesion.setProgramadaPara(programada);
        sesion.setDuracionMin(solicitud.getDuracionMin());
        sesion.setPrecio(solicitud.getTutor().getPrecioPorHora());
        sesion.setEstado(EstadoSesion.programada);

        return toDTO(sesionTutoriaRepository.save(sesion));
    }

    public List<SesionTutoriaDTO> getByTutor(Long tutorId) {
        return sesionTutoriaRepository.findByTutorId(tutorId)
                .stream().map(this::toDTO).toList();
    }

    public List<SesionTutoriaDTO> getByEstudiante(Long estudianteId) {
        return sesionTutoriaRepository.findByEstudianteId(estudianteId)
                .stream().map(this::toDTO).toList();
    }

    @Transactional
    public SesionTutoriaDTO actualizarEstado(Long id, EstadoSesion estado) {
        SesionTutoria sesion = sesionTutoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada"));
        sesion.setEstado(estado);
        return toDTO(sesionTutoriaRepository.save(sesion));
    }

    private SesionTutoriaDTO toDTO(SesionTutoria s) {
        return SesionTutoriaDTO.builder()
                .id(s.getId())
                .solicitudId(s.getSolicitud() != null ? s.getSolicitud().getId() : null)
                .tutorId(s.getTutor().getId())
                .tutorNombre(s.getTutor().getPerfil().getNombreCompleto())
                .estudianteId(s.getEstudiante().getId())
                .estudianteNombre(s.getEstudiante().getPerfil().getNombreCompleto())
                .materiaId(s.getMateria().getId())
                .materiaNombre(s.getMateria().getNombre())
                .programadaPara(s.getProgramadaPara())
                .duracionMin(s.getDuracionMin())
                .precio(s.getPrecio())
                .enlaceReunion(s.getEnlaceReunion())
                .estado(s.getEstado())
                .motivoCancelacion(s.getMotivoCancelacion())
                .creadoEn(s.getCreadoEn())
                .build();
    }
}
