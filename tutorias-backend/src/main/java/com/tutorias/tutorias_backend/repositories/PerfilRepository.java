package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long> {
    
    /**
     * Busca un perfil por su correo electrónico.
     * @param correo El correo a buscar.
     * @return Un Optional con el Perfil si se encuentra.
     */
    Optional<Perfil> findByCorreo(String correo);
}
