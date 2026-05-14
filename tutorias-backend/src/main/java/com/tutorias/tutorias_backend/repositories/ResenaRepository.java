package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Resena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResenaRepository extends JpaRepository<Resena, Long> {
    List<Resena> findByTutorId(Long tutorId);
    List<Resena> findByEstudianteId(Long estudianteId);
    Optional<Resena> findBySesionId(Long sesionId);
}
