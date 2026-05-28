package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.ActividadEstudiante;
import com.tutorias.tutorias_backend.enums.EstadoActividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActividadEstudianteRepository extends JpaRepository<ActividadEstudiante, Long> {
    List<ActividadEstudiante> findByEstudianteId(Long estudianteId);
    List<ActividadEstudiante> findBySesionId(Long sesionId);
    List<ActividadEstudiante> findByEstudianteIdAndEstado(Long estudianteId, EstadoActividad estado);
}
