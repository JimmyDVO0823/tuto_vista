package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Solicitud;
import com.tutorias.tutorias_backend.enums.EstadoSolicitud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
    // Historial de solicitudes de un estudiante
    List<Solicitud> findByEstudianteId(Long estudianteId);
    
    // Solicitudes recibidas por un tutor
    List<Solicitud> findByTutorId(Long tutorId);
    
    // Filtrar solicitudes por estado para un tutor (ej: ver solo pendientes)
    List<Solicitud> findByTutorIdAndEstado(Long tutorId, EstadoSolicitud estado);

    org.springframework.data.domain.Page<Solicitud> findByEstudianteIdAndEstado(
            Long estudianteId,
            EstadoSolicitud estado,
            org.springframework.data.domain.Pageable pageable
    );

    org.springframework.data.domain.Page<Solicitud> findByTutorIdAndEstado(
            Long tutorId,
            EstadoSolicitud estado,
            org.springframework.data.domain.Pageable pageable
    );

    @org.springframework.data.jpa.repository.Query("SELECT s FROM Solicitud s WHERE s.estudiante.id = :estudianteId AND s.estado = :estado " +
           "AND NOT EXISTS (SELECT ses FROM SesionTutoria ses WHERE ses.solicitud.id = s.id)")
    org.springframework.data.domain.Page<Solicitud> findByEstudianteIdAndEstadoAndNotPagada(
            @org.springframework.data.repository.query.Param("estudianteId") Long estudianteId,
            @org.springframework.data.repository.query.Param("estado") EstadoSolicitud estado,
            org.springframework.data.domain.Pageable pageable
    );
}
