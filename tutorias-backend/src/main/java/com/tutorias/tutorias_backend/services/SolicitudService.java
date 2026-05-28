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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SolicitudService {

    private final SolicitudRepository solicitudRepository;
    private final EstudianteRepository estudianteRepository;
    private final TutorRepository tutorRepository;
    private final MateriaRepository materiaRepository;
    private final DisponibilidadRepository disponibilidadRepository;
    private final SesionTutoriaRepository sesionTutoriaRepository;
    private final DispoEspecificaRepository dispoEspecificaRepository;
    private final NotificacionService notificacionService;

    @Transactional
    public SolicitudDTO crear(Long estudianteId, SolicitudRequest request) {
        Estudiante estudiante = estudianteRepository.findById(estudianteId)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));
        Tutor tutor = tutorRepository.findById(request.getTutorId())
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));
        Materia materia = materiaRepository.findById(request.getMateriaId())
                .orElseThrow(() -> new RuntimeException("Materia no encontrada"));

        if (request.getHoraPreferida() == null) {
            throw new RuntimeException("La hora preferida es obligatoria.");
        }

        java.time.LocalTime horaInicioSesion = request.getHoraPreferida();
        int duracion = request.getDuracionMin() != null ? request.getDuracionMin() : 90;
        java.time.LocalTime horaFinSesion = horaInicioSesion.plusMinutes(duracion);

        boolean horarioValido = false;

        // 🌟 1. VALIDACIÓN JERÁRQUICA INTELIGENTE
        Optional<DispoEspecifica> especOpt = dispoEspecificaRepository
                .findByTutorIdAndFecha(request.getTutorId(), request.getFechaPreferida());

        if (especOpt.isPresent()) {
            DispoEspecifica espec = especOpt.get();

            if (espec.isEstaDisponible()) {
                // CASO A: Es una HORA EXTRA (Bloque Azul). Solo es válido si entra
                // completamente en este rango.
                if (!horaInicioSesion.isBefore(espec.getHoraInicio()) && !horaFinSesion.isAfter(espec.getHoraFin())) {
                    horarioValido = true;
                }
            } else {
                // CASO B: Es un BLOQUEO de horas (Gris/Rojo).
                // Verificamos si la solicitud se cruza/solapa con el rango bloqueado.
                boolean seCruzaConBloqueo = horaInicioSesion.isBefore(espec.getHoraFin())
                        && horaFinSesion.isAfter(espec.getHoraInicio());

                if (seCruzaConBloqueo) {
                    throw new RuntimeException(
                            "El horario seleccionado coincide con un bloque que el tutor ha deshabilitado para este día.");
                }

                // Si NO se cruza con las horas bloqueadas, verificamos si cae en el horario
                // recurrente normal de ese día.
                horarioValido = validarContraHorarioRecurrente(request.getTutorId(), request.getFechaPreferida(),
                        horaInicioSesion, horaFinSesion);
            }
        } else {
            // CASO C: No hay excepciones específicas para esta fecha, validamos con el
            // horario semanal regular.
            horarioValido = validarContraHorarioRecurrente(request.getTutorId(), request.getFechaPreferida(),
                    horaInicioSesion, horaFinSesion);
        }

        if (!horarioValido) {
            throw new RuntimeException(
                    "El horario seleccionado o la duración excede la disponibilidad configurada del tutor para este día.");
        }

        // Validar solapamiento con sesiones existentes (programadas o en progreso) en
        // esa fecha exacta
        java.time.OffsetDateTime nuevaInicio = java.time.OffsetDateTime.of(
                request.getFechaPreferida(),
                request.getHoraPreferida(),
                java.time.ZoneOffset.UTC);
        java.time.OffsetDateTime nuevaFin = nuevaInicio.plusMinutes(duracion);

        java.util.List<SesionTutoria> activeSessions = sesionTutoriaRepository.findByTutorIdAndEstadoIn(
                request.getTutorId(),
                java.util.List.of(com.tutorias.tutorias_backend.enums.EstadoSesion.programada,
                        com.tutorias.tutorias_backend.enums.EstadoSesion.en_progreso));

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

        Solicitud guardada = solicitudRepository.save(solicitud);
        
        // Notificar al tutor: "Solicitud de (materia) enviada por (estudiante) para (dia/mes)"
        String fechaStr = solicitud.getFechaPreferida().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM"));
        String msg = String.format("Solicitud de %s enviada por %s para %s", 
                materia.getNombre(), 
                estudiante.getPerfil().getNombreCompleto(), 
                fechaStr);
        
        notificacionService.enviar(tutor.getPerfil().getId(), 
                com.tutorias.tutorias_backend.enums.TipoNotificacion.SOLICITUD_TUTORIA, 
                "Nueva solicitud recibida", 
                msg);

        return toDTO(guardada);
    }

    // 🌟 MÉTODO AUXILIAR ENCAPSULADO PARA VALIDAR EL HORARIO SEMANAL RECURRENTE
    private boolean validarContraHorarioRecurrente(Long tutorId, java.time.LocalDate fecha, java.time.LocalTime inicio,
            java.time.LocalTime fin) {
        List<Disponibilidad> disponibilidades = disponibilidadRepository
                .findByTutorIdAndEstaActivoTrue(tutorId);

        int diaSemanaJava = fecha.getDayOfWeek().getValue(); // 1 = Lunes, ..., 7 = Domingo
        int diaSemanaDB = diaSemanaJava == 7 ? 0 : diaSemanaJava; // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

        for (Disponibilidad d : disponibilidades) {
            if (d.getDiaSemana() == diaSemanaDB) {
                if (!inicio.isBefore(d.getHoraInicio()) && !fin.isAfter(d.getHoraFin())) {
                    return true;
                }
            }
        }
        return false;
    }

    @Transactional
    public SolicitudDTO actualizarEstado(Long solicitudId, EstadoSolicitud nuevoEstado) {
        Solicitud solicitud = solicitudRepository.findById(solicitudId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        if (nuevoEstado == EstadoSolicitud.aceptada) {
            if (solicitud.getEstado() != EstadoSolicitud.pendiente) {
                throw new RuntimeException("La solicitud no está pendiente, por lo que no puede ser aceptada.");
            }

            // Combinar fecha y hora preferida para programar la nueva sesión
            java.time.OffsetDateTime programada = java.time.OffsetDateTime.of(
                    solicitud.getFechaPreferida(),
                    solicitud.getHoraPreferida(),
                    java.time.ZoneOffset.UTC);
            java.time.OffsetDateTime nuevaInicio = programada;
            java.time.OffsetDateTime nuevaFin = programada.plusMinutes(solicitud.getDuracionMin());

            // 1. Validar solapamiento con sesiones existentes (programadas o en progreso)
            List<SesionTutoria> activeSessions = sesionTutoriaRepository.findByTutorIdAndEstadoIn(
                    solicitud.getTutor().getId(),
                    List.of(com.tutorias.tutorias_backend.enums.EstadoSesion.programada, com.tutorias.tutorias_backend.enums.EstadoSesion.en_progreso));

            for (SesionTutoria s : activeSessions) {
                java.time.OffsetDateTime extInicio = s.getProgramadaPara();
                java.time.OffsetDateTime extFin = extInicio.plusMinutes(s.getDuracionMin());

                // Solapamiento si: nuevaInicio < extFin AND nuevaFin > extInicio
                if (nuevaInicio.isBefore(extFin) && nuevaFin.isAfter(extInicio)) {
                    throw new RuntimeException("El tutor ya tiene otra sesión activa programada en esta franja horaria: " +
                            extInicio.toLocalTime() + " - " + extFin.toLocalTime());
                }
            }

            // 2. Auto-rechazar otras solicitudes pendientes que se solapen
            List<Solicitud> pendingRequests = solicitudRepository.findByTutorIdAndEstado(
                    solicitud.getTutor().getId(),
                    EstadoSolicitud.pendiente);

            for (Solicitud p : pendingRequests) {
                if (p.getId().equals(solicitud.getId())) {
                    continue;
                }

                java.time.OffsetDateTime reqInicio = java.time.OffsetDateTime.of(
                        p.getFechaPreferida(),
                        p.getHoraPreferida(),
                        java.time.ZoneOffset.UTC);
                java.time.OffsetDateTime reqFin = reqInicio.plusMinutes(p.getDuracionMin());

                if (reqInicio.isBefore(nuevaFin) && reqFin.isAfter(nuevaInicio)) {
                    p.setEstado(EstadoSolicitud.rechazada);
                    p.setMensaje(p.getMensaje() == null
                            ? "Cruce de horarios con otra sesión ya confirmada"
                            : p.getMensaje()
                                    + " [Rechazada automáticamente por cruce de horarios con otra tutoría confirmada]");
                    solicitudRepository.save(p);
                }
            }
        }

        solicitud.setEstado(nuevoEstado);
        Solicitud guardada = solicitudRepository.save(solicitud);
        
        // Formatear fecha para el mensaje
        String fechaStr = guardada.getFechaPreferida().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM"));
        String materiaNombre = guardada.getMateria().getNombre();
        String tutorNombre = guardada.getTutor().getPerfil().getNombreCompleto();
        
        if (nuevoEstado == EstadoSolicitud.aceptada) {
            // "Solicitud de tutoria de (materia) aceptada para el día (mes/dia) por (profesor)"
            String msg = String.format("Solicitud de tutoria de %s aceptada para el día %s por %s", 
                    materiaNombre, fechaStr, tutorNombre);
            notificacionService.enviar(guardada.getEstudiante().getPerfil().getId(), 
                    com.tutorias.tutorias_backend.enums.TipoNotificacion.SOLICITUD_TUTORIA, 
                    "Solicitud aceptada", 
                    msg);
        } else if (nuevoEstado == EstadoSolicitud.rechazada) {
            // "Solicitud de tutoría de (materia) para el dia (mes/dia) rechazada por (profesor)"
            String msg = String.format("Solicitud de tutoría de %s para el dia %s rechazada por %s", 
                    materiaNombre, fechaStr, tutorNombre);
            notificacionService.enviar(guardada.getEstudiante().getPerfil().getId(), 
                    com.tutorias.tutorias_backend.enums.TipoNotificacion.CANCELACION_RECHAZO, 
                    "Solicitud rechazada", 
                    msg);
        }
        
        return toDTO(guardada);
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
        boolean estaPagada = sesionTutoriaRepository.findBySolicitudId(s.getId()).isPresent();
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
                .precioPorHora(s.getTutor().getPrecioPorHora())
                .pagada(estaPagada)
                .build();
    }
}