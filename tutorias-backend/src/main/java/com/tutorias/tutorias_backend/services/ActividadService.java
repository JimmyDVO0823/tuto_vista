package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.ActividadEstudianteDTO;
import com.tutorias.tutorias_backend.entities.*;
import com.tutorias.tutorias_backend.enums.EstadoActividad;
import com.tutorias.tutorias_backend.enums.TipoRecurso;
import com.tutorias.tutorias_backend.repositories.ActividadEstudianteRepository;
import com.tutorias.tutorias_backend.repositories.RecursoRepository;
import com.tutorias.tutorias_backend.repositories.SesionTutoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActividadService {

    private final ActividadEstudianteRepository actividadRepository;
    private final RecursoRepository recursoRepository;
    private final SesionTutoriaRepository sesionRepository;
    private final NotificacionService notificacionService;

    @Transactional
    public ActividadEstudianteDTO asignarActividad(Long sesionId, String titulo, String url, String descripcion) {
        SesionTutoria sesion = sesionRepository.findById(sesionId)
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada"));

        // 1. Crear el recurso
        Recurso recurso = Recurso.builder()
                .tutor(sesion.getTutor())
                .materia(sesion.getMateria())
                .titulo(titulo)
                .descripcion(descripcion)
                .urlArchivo(url)
                .tipo(TipoRecurso.enlace) // Por defecto para este flujo
                .build();
        
        recurso = recursoRepository.save(recurso);

        // 2. Crear la actividad para el estudiante
        ActividadEstudiante actividad = ActividadEstudiante.builder()
                .recurso(recurso)
                .estudiante(sesion.getEstudiante())
                .sesion(sesion)
                .estado(EstadoActividad.pendiente)
                .build();

        actividad = actividadRepository.save(actividad);

        // 3. Notificar al estudiante
        notificacionService.enviar(sesion.getEstudiante().getId(), 
                com.tutorias.tutorias_backend.enums.TipoNotificacion.NUEVA_ACTIVIDAD, 
                "Nueva actividad asignada", 
                "El tutor ha asignado una nueva actividad para la sesión de " + sesion.getMateria().getNombre());

        return toDTO(actividad);
    }

    public List<ActividadEstudianteDTO> obtenerPendientesEstudiante(Long estudianteId) {
        return actividadRepository.findByEstudianteIdAndEstado(estudianteId, EstadoActividad.pendiente)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private ActividadEstudianteDTO toDTO(ActividadEstudiante a) {
        return ActividadEstudianteDTO.builder()
                .id(a.getId())
                .recursoId(a.getRecurso() != null ? a.getRecurso().getId() : null)
                .recursoTitulo(a.getRecurso() != null ? a.getRecurso().getTitulo() : "Sin título")
                .recursoUrl(a.getRecurso() != null ? a.getRecurso().getUrlArchivo() : null)
                .estudianteId(a.getEstudiante().getId())
                .estudianteNombre(a.getEstudiante().getPerfil().getNombreCompleto())
                .sesionId(a.getSesion().getId())
                .sesionMateria(a.getSesion().getMateria().getNombre())
                .estado(a.getEstado())
                .comentarioTutor(a.getComentarioTutor())
                .build();
    }
}
