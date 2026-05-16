package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Disponibilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DisponibilidadRepository extends JpaRepository<Disponibilidad, Long> {
    // Buscar toda la disponibilidad de un tutor específico
    List<Disponibilidad> findByTutorId(Long tutorId);
    
    // Buscar disponibilidad activa por tutor
    List<Disponibilidad> findByTutorIdAndEstaActivoTrue(Long tutorId);
}
