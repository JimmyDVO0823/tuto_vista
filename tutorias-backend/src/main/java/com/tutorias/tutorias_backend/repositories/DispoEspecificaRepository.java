package com.tutorias.tutorias_backend.repositories;

import java.util.Optional;
import com.tutorias.tutorias_backend.entities.DispoEspecifica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface DispoEspecificaRepository extends JpaRepository<DispoEspecifica, Long> {
    // Para buscar las excepciones de fechas de un tutor en específico
    List<DispoEspecifica> findByTutorId(Long tutorId);

    Optional<DispoEspecifica> findByTutorIdAndFecha(Long tutorId, java.time.LocalDate fecha);
}