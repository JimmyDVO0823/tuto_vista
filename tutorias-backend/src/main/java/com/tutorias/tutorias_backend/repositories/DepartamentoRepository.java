package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {
    // Permite buscar departamentos por nombre exacto si es necesario
    Departamento findByNombre(String nombre);
}
