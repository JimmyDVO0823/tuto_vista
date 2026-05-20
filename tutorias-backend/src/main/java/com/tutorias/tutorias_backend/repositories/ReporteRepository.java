package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Reporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, Long> {
    List<Reporte> findByReportadoPorId(Long reportadoPorId);
    List<Reporte> findByReportadoAId(Long reportadoAId);
}
