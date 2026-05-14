package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Long> {
    List<Mensaje> findByConversacionIdOrderByCreadoEnAsc(Long conversacionId);
}
