package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la entidad Departamento.
 * Proporciona métodos para acceder a la información de los departamentos académicos.
 */
@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {
    // Permite buscar departamentos por nombre exacto si es necesario
    /**
     * Busca un departamento por su nombre exacto.
     * @param nombre Nombre del departamento.
     * @return El departamento encontrado o null si no existe.
     */
    Departamento findByNombre(String nombre);
}
