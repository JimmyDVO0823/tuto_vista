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

/**
 * Servicio para la gestión de actividades de estudiantes.
 * Contiene la lógica para asignar actividades, completar tareas y realizar el seguimiento
 * del progreso del estudiante en relación con las sesiones de tutoría.
 */
@Service
@RequiredArgsConstructor
public class ActividadService {

    private final ActividadEstudianteRepository actividadRepository;
    private final RecursoRepository recursoRepository;
    private final SesionTutoriaRepository sesionRepository;
    private final NotificacionService notificacionService;
    private final ChatService chatService;

    /**
     * Asigna una nueva actividad a un estudiante vinculado a una sesión de tutoría.
     * Crea un nuevo recurso si no se proporciona uno existente y envía notificaciones.
     *
     * @param sesionId Identificador de la sesión de tutoría.
     * @param recursoId Identificador de un recurso existente (opcional).
     * @param titulo Título de la actividad o recurso.
     * @param url URL del archivo o enlace de la actividad.
     * @param descripcion Descripción detallada de la actividad.
     * @return ActividadEstudianteDTO con los detalles de la actividad creada.
     */
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

    /**
     * Obtiene la lista de actividades con estado pendiente para un estudiante.
     *
     * @param estudianteId Identificador del estudiante.
     * @return Lista de ActividadEstudianteDTO pendientes.
     */
    public List<ActividadEstudianteDTO> obtenerPendientesEstudiante(Long estudianteId) {
        return actividadRepository.findByEstudianteIdAndEstado(estudianteId, EstadoActividad.pendiente)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene una lista paginada de actividades pendientes para un estudiante.
     *
     * @param estudianteId Identificador del estudiante.
     * @param page Número de página.
     * @param size Cantidad de elementos por página.
     * @return PagedResponseDTO con las actividades pendientes paginadas.
     */
    public com.tutorias.tutorias_backend.dto.PagedResponseDTO<ActividadEstudianteDTO> obtenerPendientesEstudiantePaginado(Long estudianteId, int page, int size) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size, org.springframework.data.domain.Sort.by("id").descending());
        org.springframework.data.domain.Page<ActividadEstudiante> activityPage = actividadRepository.findByEstudianteIdAndEstado(
                estudianteId, EstadoActividad.pendiente, pageable);

        return com.tutorias.tutorias_backend.dto.PagedResponseDTO.<ActividadEstudianteDTO>builder()
                .content(activityPage.getContent().stream().map(this::toDTO).toList())
                .totalPages(activityPage.getTotalPages())
                .totalElements(activityPage.getTotalElements())
                .currentPage(activityPage.getNumber())
                .size(activityPage.getSize())
                .build();
    }

    /**
     * Marca una actividad específica como completada.
     *
     * @param actividadId Identificador de la actividad.
     * @return ActividadEstudianteDTO con la actividad actualizada.
     */
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
