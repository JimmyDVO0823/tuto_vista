package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.SesionTutoria;
import com.tutorias.tutorias_backend.enums.EstadoSesion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SesionTutoriaRepository extends JpaRepository<SesionTutoria, Long> {
    List<SesionTutoria> findByTutorId(Long tutorId);
    List<SesionTutoria> findByEstudianteId(Long estudianteId);
    List<SesionTutoria> findByTutorIdAndEstado(Long tutorId, EstadoSesion estado);
    List<SesionTutoria> findByEstudianteIdAndEstado(Long estudianteId, EstadoSesion estado);
    List<SesionTutoria> findByTutorIdAndEstadoIn(Long tutorId, List<EstadoSesion> estados);
    java.util.Optional<SesionTutoria> findBySolicitudId(Long solicitudId);

    @Query("SELECT s FROM SesionTutoria s WHERE s.estudiante.id = :studentId AND s.programadaPara >= :startDate AND s.programadaPara <= :endDate")
    List<SesionTutoria> findSessionsByStudentInDateRange(
            @Param("studentId") Long studentId,
            @Param("startDate") java.time.OffsetDateTime startDate,
            @Param("endDate") java.time.OffsetDateTime endDate
    );

    Long countByTutorIdAndMateriaIdAndEstadoAndProgramadaParaAfter(Long tutorId, Long materiaId, EstadoSesion estado, java.time.OffsetDateTime since);

    Long countByTutorIdAndMateriaIdAndEstadoInAndProgramadaParaAfter(Long tutorId, Long materiaId, List<EstadoSesion> estados, java.time.OffsetDateTime since);

    Long countByTutorIdAndMateriaIdAndEstadoIn(Long tutorId, Long materiaId, List<EstadoSesion> estados);

    @Query("SELECT s FROM SesionTutoria s " +
           "JOIN Pago p ON p.sesion.id = s.id " +
           "WHERE s.tutor.id = :tutorId " +
           "AND s.materia.id = :materiaId " +
           "AND p.estado = :pagoEstado " +
           "AND s.programadaPara > :since " +
           "ORDER BY s.programadaPara ASC")
    List<SesionTutoria> findNextPaidSession(
            @Param("tutorId") Long tutorId,
            @Param("materiaId") Long materiaId,
            @Param("pagoEstado") com.tutorias.tutorias_backend.enums.EstadoPago pagoEstado,
            @Param("since") java.time.OffsetDateTime since,
            org.springframework.data.domain.Pageable pageable
    );

    @Query("SELECT SUM(s.duracionMin) FROM SesionTutoria s WHERE s.tutor.id = :tutorId AND s.estado = 'completada' AND s.programadaPara >= :startOfMonth")
    Long sumDuracionMinByTutorAndMonth(
            @Param("tutorId") Long tutorId,
            @Param("startOfMonth") java.time.OffsetDateTime startOfMonth
    );
}
