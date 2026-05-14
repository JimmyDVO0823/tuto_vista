package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Long> {
    List<Recurso> findByTutorId(Long tutorId);
    List<Recurso> findByMateriaId(Long materiaId);
    List<Recurso> findByTutorIdAndMateriaId(Long tutorId, Long materiaId);
}
