package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.ActividadEstudianteDTO;
import com.tutorias.tutorias_backend.dto.AsignarActividadRequest;
import com.tutorias.tutorias_backend.services.ActividadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de actividades de estudiantes.
 * Maneja las peticiones relacionadas con la asignación y seguimiento de actividades.
 */
@RestController
@RequestMapping("/actividades")
@RequiredArgsConstructor
public class ActividadController {

    private final ActividadService actividadService;

    /**
     * Asigna una nueva actividad a un estudiante basándose en la petición proporcionada.
     *
     * @param request Datos de la actividad a asignar.
     * @return ResponseEntity con los detalles de la actividad creada.
     */
    @PostMapping("/asignar")
    public ResponseEntity<ActividadEstudianteDTO> asignar(@RequestBody AsignarActividadRequest request) {
        String urlFinal = request.getUrlArchivo() != null ? request.getUrlArchivo() : request.getUrl();
        return ResponseEntity.ok(actividadService.asignarActividad(
                request.getSesionId(),
                request.getRecursoId(),
                request.getTitulo(),
                urlFinal,
                request.getDescripcion()));
    }

    /**
     * Obtiene la lista de actividades pendientes para un estudiante específico.
     *
     * @param id Identificador del estudiante.
     * @return ResponseEntity con la lista de actividades pendientes.
     */
    @GetMapping("/estudiante/{id}/pendientes")
    public ResponseEntity<List<ActividadEstudianteDTO>> obtenerPendientes(@PathVariable Long id) {
        return ResponseEntity.ok(actividadService.obtenerPendientesEstudiante(id));
    }

    /**
     * Obtiene una respuesta paginada de las actividades pendientes de un estudiante.
     *
     * @param id Identificador del estudiante.
     * @param page Número de página (por defecto 0).
     * @param size Tamaño de la página (por defecto 5).
     * @return ResponseEntity con la respuesta paginada de actividades.
     */
    @GetMapping("/estudiante/{id}/pendientes/paginado")
    public ResponseEntity<com.tutorias.tutorias_backend.dto.PagedResponseDTO<ActividadEstudianteDTO>> obtenerPendientesPaginado(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(actividadService.obtenerPendientesEstudiantePaginado(id, page, size));
    }

    /**
     * Marca una actividad como completada.
     *
     * @param id Identificador de la actividad.
     * @return ResponseEntity con los detalles de la actividad actualizada.
     */
    @PatchMapping("/{id}/completar")
    public ResponseEntity<ActividadEstudianteDTO> completar(@PathVariable Long id) {
        return ResponseEntity.ok(actividadService.completarActividad(id));
    }
}
