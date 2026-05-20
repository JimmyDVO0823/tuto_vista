package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.TutorInsignia;
import com.tutorias.tutorias_backend.entities.TutorInsigniaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TutorInsigniaRepository extends JpaRepository<TutorInsignia, TutorInsigniaId> {
    List<TutorInsignia> findByTutorId(Long tutorId);
}
