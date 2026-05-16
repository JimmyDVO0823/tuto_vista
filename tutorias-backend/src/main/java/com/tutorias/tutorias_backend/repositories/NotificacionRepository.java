package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
    List<Notificacion> findByPerfilId(Long perfilId);
    List<Notificacion> findByPerfilIdAndLeidaFalse(Long perfilId);
}
