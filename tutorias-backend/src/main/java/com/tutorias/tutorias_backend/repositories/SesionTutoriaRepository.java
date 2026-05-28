package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.SesionTutoria;
import com.tutorias.tutorias_backend.enums.EstadoSesion;
import org.springframework.data.jpa.repository.JpaRepository;
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

    @org.springframework.data.jpa.repository.Query("SELECT s FROM SesionTutoria s WHERE s.estudiante.id = :studentId AND s.programadaPara >= :startDate AND s.programadaPara <= :endDate")
    List<SesionTutoria> findSessionsByStudentInDateRange(
            @org.springframework.data.repository.query.Param("studentId") Long studentId,
            @org.springframework.data.repository.query.Param("startDate") java.time.OffsetDateTime startDate,
            @org.springframework.data.repository.query.Param("endDate") java.time.OffsetDateTime endDate
    );

    @org.springframework.data.jpa.repository.Query("SELECT SUM(s.duracionMin) FROM SesionTutoria s WHERE s.tutor.id = :tutorId AND s.estado = 'completada' AND s.programadaPara >= :startOfMonth")
    Long sumDuracionMinByTutorAndMonth(
            @org.springframework.data.repository.query.Param("tutorId") Long tutorId,
            @org.springframework.data.repository.query.Param("startOfMonth") java.time.OffsetDateTime startOfMonth
    );
}
