package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.ActividadEstudiante;
import com.tutorias.tutorias_backend.enums.EstadoActividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repositorio para la entidad ActividadEstudiante.
 * Proporciona métodos para buscar actividades por estudiante, sesión y estado.
 */
@Repository
public interface ActividadEstudianteRepository extends JpaRepository<ActividadEstudiante, Long> {
    /**
     * Busca todas las actividades asignadas a un estudiante.
     * @param estudianteId ID del estudiante.
     * @return Lista de actividades.
     */
    List<ActividadEstudiante> findByEstudianteId(Long estudianteId);
    /**
     * Busca todas las actividades vinculadas a una sesión de tutoría.
     * @param sesionId ID de la sesión.
     * @return Lista de actividades.
     */
    List<ActividadEstudiante> findBySesionId(Long sesionId);
    /**
     * Busca actividades de un estudiante filtradas por su estado.
     * @param estudianteId ID del estudiante.
     * @param estado Estado de la actividad (p.ej. pendiente, completado).
     * @return Lista de actividades que coinciden con los criterios.
     */
    List<ActividadEstudiante> findByEstudianteIdAndEstado(Long estudianteId, EstadoActividad estado);

    /**
     * Busca actividades de un estudiante filtradas por su estado con soporte para paginación.
     * @param estudianteId ID del estudiante.
     * @param estado Estado de la actividad.
     * @param pageable Configuración de paginación.
     * @return Página de actividades.
     */
    org.springframework.data.domain.Page<ActividadEstudiante> findByEstudianteIdAndEstado(
            Long estudianteId,
            EstadoActividad estado,
            org.springframework.data.domain.Pageable pageable
    );
}
