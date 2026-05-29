package com.tutorias.tutorias_backend.repositories;

import com.tutorias.tutorias_backend.entities.Tutor;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long>, org.springframework.data.jpa.repository.JpaSpecificationExecutor<Tutor> {

    @EntityGraph(attributePaths = {
        "perfil",
        "tutorMaterias",
        "tutorMaterias.materia",
        "tutorMaterias.materia.departamento",
        "insignias",
        "insignias.insignia"
    })
    org.springframework.data.domain.Page<Tutor> findByEstaDisponibleTrue(org.springframework.data.domain.Pageable pageable);
}
