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

    @org.springframework.data.jpa.repository.Query("SELECT SUM(p.pagoTutor) FROM Pago p WHERE p.tutor.id = :tutorId AND p.estado = 'completado' AND p.creadoEn >= :startOfLastMonth AND p.creadoEn < :startOfCurrentMonth")
    java.math.BigDecimal sumPagoTutorByTutorAndLastMonth(
            @org.springframework.data.repository.query.Param("tutorId") Long tutorId,
            @org.springframework.data.repository.query.Param("startOfLastMonth") java.time.OffsetDateTime startOfLastMonth,
            @org.springframework.data.repository.query.Param("startOfCurrentMonth") java.time.OffsetDateTime startOfCurrentMonth
    );

    List<Pago> findByTutorIdAndEstadoOrderByCreadoEnAsc(Long tutorId, EstadoPago estado);
}
