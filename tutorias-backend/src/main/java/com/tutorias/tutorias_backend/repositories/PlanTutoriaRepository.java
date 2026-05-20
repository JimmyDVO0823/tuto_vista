package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.PlanTutoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanTutoriaRepository extends JpaRepository<PlanTutoria, Long> {
    List<PlanTutoria> findByTutorId(Long tutorId);
}
