package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Conversacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repositorio para la entidad Conversacion.
 * Maneja consultas personalizadas para encontrar conversaciones por perfil o entre participantes específicos.
 */
@Repository
public interface ConversacionRepository extends JpaRepository<Conversacion, Long> {
    /**
     * Obtiene todas las conversaciones en las que participa un perfil determinado.
     *
     * @param perfilId Identificador del perfil.
     * @return Lista de conversaciones.
     */
    @Query("SELECT c FROM Conversacion c JOIN c.participantes p WHERE p.id = :perfilId")
    List<Conversacion> findByPerfilId(@Param("perfilId") Long perfilId);

    /**
     * Busca una conversación exacta que involucre únicamente a los dos participantes proporcionados.
     *
     * @param p1 Identificador del primer participante.
     * @param p2 Identificador del segundo participante.
     * @return Lista con la conversación encontrada (si existe).
     */
    @Query("SELECT c FROM Conversacion c " +
           "WHERE (SELECT COUNT(p) FROM c.participantes p WHERE p.id IN (:p1, :p2)) = 2 " +
           "AND SIZE(c.participantes) = 2")
    List<Conversacion> findExactConversation(@Param("p1") Long p1, @Param("p2") Long p2);
}
