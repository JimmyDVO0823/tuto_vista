package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Configuracion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repositorio para la entidad Configuracion.
 * Permite acceder a parámetros de configuración persistentes mediante su clave única.
 */
@Repository
public interface ConfiguracionRepository extends JpaRepository<Configuracion, Long> {
    /**
     * Busca una configuración específica por su clave única.
     * @param clave Nombre de la clave de configuración.
     * @return Opcional con la entidad Configuracion si existe.
     */
    Optional<Configuracion> findByClave(String clave);
}
