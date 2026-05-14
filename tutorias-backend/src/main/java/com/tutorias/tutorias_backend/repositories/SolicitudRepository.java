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
}
