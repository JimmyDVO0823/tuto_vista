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
    private final ChatService chatService;

    @Transactional
    public ActividadEstudianteDTO asignarActividad(Long sesionId, Long recursoId, String titulo, String url,
            String descripcion) {
        SesionTutoria sesion = sesionRepository.findById(sesionId)
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada"));

        Recurso recurso;

        // 🌟 CONDICIONAL CLAVE: ¿El recurso ya existe o es nuevo?
        if (recursoId != null) {
            // SI EXISTE: Lo buscamos en la base de datos y reutilizamos el objeto
            recurso = recursoRepository.findById(recursoId)
                    .orElseThrow(() -> new RuntimeException("Recurso guardado no encontrado"));
        } else {
            // NO EXISTE: Creamos un nuevo recurso de la forma tradicional (Evita errores de
            // Builder)
            recurso = new Recurso();
            recurso.setTutor(sesion.getTutor());
            recurso.setMateria(sesion.getMateria()); // 🌟 Mapea el objeto Materia completo igual que en tu
                                                     // RecursoService
            recurso.setTitulo(titulo);
            recurso.setDescripcion(descripcion);
            recurso.setUrlArchivo(url);
            recurso.setTipo(TipoRecurso.enlace);

            recurso = recursoRepository.save(recurso);
        }

        // 2. Crear la actividad para el estudiante (El resto del código se queda igual)
        ActividadEstudiante actividad = ActividadEstudiante.builder()
                .recurso(recurso)
                .estudiante(sesion.getEstudiante())
                .sesion(sesion)
                .estado(EstadoActividad.pendiente)
                .build();

        actividad = actividadRepository.save(actividad);

        // 3. Notificar al estudiante via notificaciones push/web
        notificacionService.enviar(sesion.getEstudiante().getId(),
                com.tutorias.tutorias_backend.enums.TipoNotificacion.NUEVA_ACTIVIDAD,
                "Nueva actividad asignada",
                "El tutor ha asignado una nueva actividad para la sesión de " + sesion.getMateria().getNombre());

        // 4. Notificar via Chat automático
        try {
            com.tutorias.tutorias_backend.dto.ConversacionDTO conv = chatService
                    .crearOObtenerConversacion(sesion.getTutor().getId(), sesion.getEstudiante().getId());
            String chatMsg = String.format("📢 He asignado una nueva actividad: **%s**.\nPuedes revisarla aquí: %s",
                    recurso.getTitulo(), recurso.getUrlArchivo());
            chatService.enviarMensaje(conv.getId(), sesion.getTutor().getId(), chatMsg);
        } catch (Exception e) {
            System.err.println("Error enviando mensaje de chat automático: " + e.getMessage());
        }

        return toDTO(actividad);
    }

    public List<ActividadEstudianteDTO> obtenerPendientesEstudiante(Long estudianteId) {
        return actividadRepository.findByEstudianteIdAndEstado(estudianteId, EstadoActividad.pendiente)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ActividadEstudianteDTO completarActividad(Long actividadId) {
        ActividadEstudiante actividad = actividadRepository.findById(actividadId)
                .orElseThrow(() -> new RuntimeException("Actividad no encontrada"));
        actividad.setEstado(EstadoActividad.completado);
        return toDTO(actividadRepository.save(actividad));
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
