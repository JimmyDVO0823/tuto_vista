package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Pago;
import com.tutorias.tutorias_backend.enums.EstadoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    Optional<Pago> findBySesionId(Long sesionId);
    List<Pago> findByEstudianteId(Long estudianteId);
    List<Pago> findByTutorId(Long tutorId);
    List<Pago> findByEstado(EstadoPago estado);
}
