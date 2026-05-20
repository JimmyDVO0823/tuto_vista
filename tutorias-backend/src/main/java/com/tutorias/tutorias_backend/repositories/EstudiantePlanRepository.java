package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.EstudiantePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstudiantePlanRepository extends JpaRepository<EstudiantePlan, Long> {
    List<EstudiantePlan> findByEstudianteId(Long estudianteId);
}
