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
    private final NotificacionService notificacionService;

    @Transactional
    public SesionTutoriaDTO crearDesdeSolicitud(Long solicitudId) {
        // Idempotencia: Si ya existe una sesión para esta solicitud, retornamos esa en lugar de crear una nueva
        java.util.Optional<SesionTutoria> existente = sesionTutoriaRepository.findBySolicitudId(solicitudId);
        if (existente.isPresent()) {
            return toDTO(existente.get());
        }

        Solicitud solicitud = solicitudRepository.findById(solicitudId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        // Combinar fecha y hora preferida para programar la nueva sesión
        OffsetDateTime programada = OffsetDateTime.of(
                solicitud.getFechaPreferida(),
                solicitud.getHoraPreferida(),
                ZoneOffset.UTC);

        SesionTutoria sesion = new SesionTutoria();
        sesion.setSolicitud(solicitud);
        sesion.setTutor(solicitud.getTutor());
        sesion.setEstudiante(solicitud.getEstudiante());
        sesion.setMateria(solicitud.getMateria());
        sesion.setProgramadaPara(programada);
        sesion.setDuracionMin(solicitud.getDuracionMin());
        // El precio total se calcula en base a la duración y precio por hora de la solicitud
        java.math.BigDecimal precioPorHora = solicitud.getTutor().getPrecioPorHora();
        java.math.BigDecimal duracionHoras = java.math.BigDecimal.valueOf(solicitud.getDuracionMin()).divide(java.math.BigDecimal.valueOf(60), 2, java.math.RoundingMode.HALF_UP);
        sesion.setPrecio(precioPorHora.multiply(duracionHoras));
        sesion.setEstado(EstadoSesion.programada);

        SesionTutoria guardada = sesionTutoriaRepository.save(sesion);

        // Crear u obtener conversación entre tutor y estudiante
        chatService.crearOObtenerConversacion(
                solicitud.getTutor().getPerfil().getId(),
                solicitud.getEstudiante().getPerfil().getId());

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
    public SesionTutoriaDTO actualizarEstado(Long id, EstadoSesion estado, String motivo) {
        SesionTutoria sesion = sesionTutoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada"));

        sesion.setEstado(estado);

        // Si la sesión pasa a un estado de cierre negativo, acoplamos el motivo
        if (estado == EstadoSesion.cancelada || estado == EstadoSesion.no_asistio) {
            if (motivo != null && !motivo.trim().isEmpty()) {
                sesion.setMotivoCancelacion(motivo);
            }
        } else {
            // Flujo feliz (en_progreso, completada): nos aseguramos de limpiar el motivo si
            // existía alguno
            sesion.setMotivoCancelacion(null);
        }

        SesionTutoria guardada = sesionTutoriaRepository.save(sesion);
        
        // Notificar si se cancela
        if (estado == EstadoSesion.cancelada) {
            String fechaStr = guardada.getProgramadaPara().format(java.time.format.DateTimeFormatter.ofPattern("dd/MM"));
            String msg = String.format("Tutoría de %s para el dia %s cancelada por %s", 
                    guardada.getMateria().getNombre(), 
                    fechaStr, 
                    guardada.getTutor().getPerfil().getNombreCompleto());
            
            notificacionService.enviar(guardada.getEstudiante().getPerfil().getId(), 
                    com.tutorias.tutorias_backend.enums.TipoNotificacion.CANCELACION_RECHAZO, 
                    "Sesión cancelada", 
                    msg);
        }
        
        return toDTO(guardada);
    }

    @Transactional
    public SesionTutoriaDTO actualizarEnlace(Long id, String enlaceReunion) {
        SesionTutoria sesion = sesionTutoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada"));

        sesion.setEnlaceReunion(enlaceReunion);
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
