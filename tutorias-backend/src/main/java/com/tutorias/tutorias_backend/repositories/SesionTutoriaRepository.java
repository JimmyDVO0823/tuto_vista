package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.SesionTutoria;
import com.tutorias.tutorias_backend.enums.EstadoSesion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SesionTutoriaRepository extends JpaRepository<SesionTutoria, Long> {
    List<SesionTutoria> findByTutorId(Long tutorId);
    List<SesionTutoria> findByEstudianteId(Long estudianteId);
    List<SesionTutoria> findByTutorIdAndEstado(Long tutorId, EstadoSesion estado);
    List<SesionTutoria> findByEstudianteIdAndEstado(Long estudianteId, EstadoSesion estado);
}
