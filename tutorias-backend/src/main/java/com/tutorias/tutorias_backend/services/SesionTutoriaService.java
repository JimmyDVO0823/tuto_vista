package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.SesionTutoriaDTO;
import com.tutorias.tutorias_backend.entities.*;
import com.tutorias.tutorias_backend.enums.EstadoSesion;
import com.tutorias.tutorias_backend.enums.EstadoSolicitud;
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
    private final ChatService chatService;

    @Transactional
    public SesionTutoriaDTO crearDesdeSolicitud(Long solicitudId) {
        Solicitud solicitud = solicitudRepository.findById(solicitudId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        if (solicitud.getEstado() != EstadoSolicitud.pendiente) {
            throw new RuntimeException("La solicitud no está pendiente, por lo que no puede ser aceptada.");
        }

        // Combinar fecha y hora preferida para programar la nueva sesión
        OffsetDateTime programada = OffsetDateTime.of(
            solicitud.getFechaPreferida(), 
            solicitud.getHoraPreferida(), 
            ZoneOffset.UTC
        );
        OffsetDateTime nuevaInicio = programada;
        OffsetDateTime nuevaFin = programada.plusMinutes(solicitud.getDuracionMin());

        // 1. Validar solapamiento con sesiones existentes (programadas o en progreso)
        List<SesionTutoria> activeSessions = sesionTutoriaRepository.findByTutorIdAndEstadoIn(
            solicitud.getTutor().getId(),
            List.of(EstadoSesion.programada, EstadoSesion.en_progreso)
        );

        for (SesionTutoria s : activeSessions) {
            OffsetDateTime extInicio = s.getProgramadaPara();
            OffsetDateTime extFin = extInicio.plusMinutes(s.getDuracionMin());

            // Solapamiento si: nuevaInicio < extFin AND nuevaFin > extInicio
            if (nuevaInicio.isBefore(extFin) && nuevaFin.isAfter(extInicio)) {
                throw new RuntimeException("El tutor ya tiene otra sesión activa programada en esta franja horaria: " +
                        extInicio.toLocalTime() + " - " + extFin.toLocalTime());
            }
        }

        // 2. Cambiar estado de la solicitud actual a aceptada
        solicitud.setEstado(EstadoSolicitud.aceptada);
        solicitudRepository.save(solicitud);

        // 3. Auto-rechazar otras solicitudes pendientes que se solapen
        List<Solicitud> pendingRequests = solicitudRepository.findByTutorIdAndEstado(
            solicitud.getTutor().getId(),
            EstadoSolicitud.pendiente
        );

        for (Solicitud p : pendingRequests) {
            if (p.getId().equals(solicitud.getId())) {
                continue;
            }

            OffsetDateTime reqInicio = OffsetDateTime.of(
                p.getFechaPreferida(),
                p.getHoraPreferida(),
                ZoneOffset.UTC
            );
            OffsetDateTime reqFin = reqInicio.plusMinutes(p.getDuracionMin());

            if (reqInicio.isBefore(nuevaFin) && reqFin.isAfter(nuevaInicio)) {
                p.setEstado(EstadoSolicitud.rechazada);
                p.setMensaje(p.getMensaje() == null 
                    ? "Cruce de horarios con otra sesión ya confirmada" 
                    : p.getMensaje() + " [Rechazada automáticamente por cruce de horarios con otra tutoría confirmada]");
                solicitudRepository.save(p);
            }
        }

        SesionTutoria sesion = new SesionTutoria();
        sesion.setSolicitud(solicitud);
        sesion.setTutor(solicitud.getTutor());
        sesion.setEstudiante(solicitud.getEstudiante());
        sesion.setMateria(solicitud.getMateria());
        sesion.setProgramadaPara(programada);
        sesion.setDuracionMin(solicitud.getDuracionMin());
        sesion.setPrecio(solicitud.getTutor().getPrecioPorHora());
        sesion.setEstado(EstadoSesion.programada);

        SesionTutoria guardada = sesionTutoriaRepository.save(sesion);

        // Crear u obtener conversación entre tutor y estudiante
        chatService.crearOObtenerConversacion(
            solicitud.getTutor().getPerfil().getId(),
            solicitud.getEstudiante().getPerfil().getId()
        );

        return toDTO(guardada);
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
