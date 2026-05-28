package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.TutorMateria;
import com.tutorias.tutorias_backend.entities.TutorMateriaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface TutorMateriaRepository extends JpaRepository<TutorMateria, TutorMateriaId> {

    @Query("SELECT tm FROM TutorMateria tm JOIN FETCH tm.materia WHERE tm.tutor.id = :tutorId")
    List<TutorMateria> findByTutorId(@Param("tutorId") Long tutorId);

    Optional<TutorMateria> findByTutorIdAndMateriaId(Long tutorId, Long materiaId);
}
