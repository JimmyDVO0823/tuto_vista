package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Insignia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsigniaRepository extends JpaRepository<Insignia, Long> {
}
