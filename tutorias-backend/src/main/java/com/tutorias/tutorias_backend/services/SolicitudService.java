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

    // 🌟 INYECTAMOS EL REPOSITORIO DE ESPECÍFICAS
    private final DispoEspecificaRepository dispoEspecificaRepository;

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

        return toDTO(solicitudRepository.save(solicitud));
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