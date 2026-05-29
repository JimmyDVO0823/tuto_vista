package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.TipoPregunta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoPreguntaRepository extends JpaRepository<TipoPregunta, Long> {
}
