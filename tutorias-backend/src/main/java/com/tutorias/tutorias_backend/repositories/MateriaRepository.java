package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long> {
    // Buscar materias por departamento
    List<Materia> findByDepartamentoId(Long departamentoId);

    // Buscar por nombre (parcial)
    List<Materia> findByNombreContainingIgnoreCase(String nombre);
}
