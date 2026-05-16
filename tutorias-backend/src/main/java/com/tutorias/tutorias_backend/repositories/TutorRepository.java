package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long> {
}
