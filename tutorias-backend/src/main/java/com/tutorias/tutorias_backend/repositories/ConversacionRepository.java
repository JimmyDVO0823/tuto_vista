package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Conversacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConversacionRepository extends JpaRepository<Conversacion, Long> {
    @Query("SELECT c FROM Conversacion c JOIN c.participantes p WHERE p.id = :perfilId")
    List<Conversacion> findByPerfilId(@Param("perfilId") Long perfilId);
}
