package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {
}
