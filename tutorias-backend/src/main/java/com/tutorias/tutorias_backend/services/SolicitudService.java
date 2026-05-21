package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.SolicitudDTO;
import com.tutorias.tutorias_backend.dto.SolicitudRequest;
import com.tutorias.tutorias_backend.entities.*;
import com.tutorias.tutorias_backend.enums.EstadoSolicitud;
import com.tutorias.tutorias_backend.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SolicitudService {

    private final SolicitudRepository solicitudRepository;
    private final EstudianteRepository estudianteRepository;
    private final TutorRepository tutorRepository;
    private final MateriaRepository materiaRepository;
    private final DisponibilidadRepository disponibilidadRepository;
    private final SesionTutoriaRepository sesionTutoriaRepository;

    @Transactional
    public SolicitudDTO crear(Long estudianteId, SolicitudRequest request) {
        Estudiante estudiante = estudianteRepository.findById(estudianteId)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));
        Tutor tutor = tutorRepository.findById(request.getTutorId())
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));
        Materia materia = materiaRepository.findById(request.getMateriaId())
                .orElseThrow(() -> new RuntimeException("Materia no encontrada"));

        // Validar disponibilidad
        if (request.getHoraPreferida() == null) {
            throw new RuntimeException("La hora preferida es obligatoria.");
        }
        
        java.util.List<Disponibilidad> disponibilidades = disponibilidadRepository.findByTutorIdAndEstaActivoTrue(request.getTutorId());
        
        int diaSemanaJava = request.getFechaPreferida().getDayOfWeek().getValue(); // 1 = Lunes, ..., 7 = Domingo
        int diaSemanaDB = diaSemanaJava == 7 ? 0 : diaSemanaJava; // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
        
        java.time.LocalTime horaInicioSesion = request.getHoraPreferida();
        int duracion = request.getDuracionMin() != null ? request.getDuracionMin() : 90;
        java.time.LocalTime horaFinSesion = horaInicioSesion.plusMinutes(duracion);
        
        boolean horarioValido = false;
        for (Disponibilidad d : disponibilidades) {
            if (d.getDiaSemana() == diaSemanaDB) {
                if (!horaInicioSesion.isBefore(d.getHoraInicio()) && !horaFinSesion.isAfter(d.getHoraFin())) {
                    horarioValido = true;
                    break;
                }
            }
        }
        
        if (!horarioValido) {
            throw new RuntimeException("El horario seleccionado o la duración excede la disponibilidad configurada del tutor para este día.");
        }

        // Validar solapamiento con sesiones existentes (programadas o en progreso) en esa fecha exacta
        java.time.OffsetDateTime nuevaInicio = java.time.OffsetDateTime.of(
            request.getFechaPreferida(), 
            request.getHoraPreferida(), 
            java.time.ZoneOffset.UTC
        );
        java.time.OffsetDateTime nuevaFin = nuevaInicio.plusMinutes(duracion);

        java.util.List<SesionTutoria> activeSessions = sesionTutoriaRepository.findByTutorIdAndEstadoIn(
            request.getTutorId(),
            java.util.List.of(com.tutorias.tutorias_backend.enums.EstadoSesion.programada, com.tutorias.tutorias_backend.enums.EstadoSesion.en_progreso)
        );

        for (SesionTutoria s : activeSessions) {
            java.time.OffsetDateTime extInicio = s.getProgramadaPara();
            java.time.OffsetDateTime extFin = extInicio.plusMinutes(s.getDuracionMin());

            if (nuevaInicio.isBefore(extFin) && nuevaFin.isAfter(extInicio)) {
                throw new RuntimeException("El tutor ya está ocupado en ese horario exacto (" + 
                        extInicio.toLocalTime() + " - " + extFin.toLocalTime() + ") por otra tutoría confirmada.");
            }
        }

        Solicitud solicitud = new Solicitud();
        solicitud.setEstudiante(estudiante);
        solicitud.setTutor(tutor);
        solicitud.setMateria(materia);
        solicitud.setFechaPreferida(request.getFechaPreferida());
        solicitud.setHoraPreferida(request.getHoraPreferida());
        solicitud.setDuracionMin(duracion);
        solicitud.setMensaje(request.getMensaje());
        solicitud.setEstado(EstadoSolicitud.pendiente);

        return toDTO(solicitudRepository.save(solicitud));
    }

    @Transactional
    public SolicitudDTO actualizarEstado(Long solicitudId, EstadoSolicitud nuevoEstado) {
        Solicitud solicitud = solicitudRepository.findById(solicitudId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));
        solicitud.setEstado(nuevoEstado);
        return toDTO(solicitudRepository.save(solicitud));
    }

    public List<SolicitudDTO> getByEstudiante(Long estudianteId) {
        return solicitudRepository.findByEstudianteId(estudianteId)
                .stream().map(this::toDTO).toList();
    }

    public List<SolicitudDTO> getByTutor(Long tutorId) {
        return solicitudRepository.findByTutorId(tutorId)
                .stream().map(this::toDTO).toList();
    }

    public List<SolicitudDTO> getByTutorYEstado(Long tutorId, EstadoSolicitud estado) {
        return solicitudRepository.findByTutorIdAndEstado(tutorId, estado)
                .stream().map(this::toDTO).toList();
    }

    private SolicitudDTO toDTO(Solicitud s) {
        return SolicitudDTO.builder()
                .id(s.getId())
                .estudianteId(s.getEstudiante().getId())
                .estudianteNombre(s.getEstudiante().getPerfil().getNombreCompleto())
                .tutorId(s.getTutor().getId())
                .tutorNombre(s.getTutor().getPerfil().getNombreCompleto())
                .materiaId(s.getMateria().getId())
                .materiaNombre(s.getMateria().getNombre())
                .fechaPreferida(s.getFechaPreferida())
                .horaPreferida(s.getHoraPreferida())
                .duracionMin(s.getDuracionMin())
                .mensaje(s.getMensaje())
                .estado(s.getEstado())
                .creadoEn(s.getCreadoEn())
                .build();
    }
}
