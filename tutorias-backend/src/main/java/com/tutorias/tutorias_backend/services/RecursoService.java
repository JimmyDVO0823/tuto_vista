package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.entities.Recurso;
import com.tutorias.tutorias_backend.repositories.MateriaRepository;
import com.tutorias.tutorias_backend.repositories.RecursoRepository;
import com.tutorias.tutorias_backend.repositories.TutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecursoService {

    private final RecursoRepository recursoRepository;
    private final TutorRepository tutorRepository;
    private final MateriaRepository materiaRepository;

    public Recurso crear(Long tutorId, Long materiaId, Recurso recurso) {
        recurso.setTutor(tutorRepository.findById(tutorId).orElseThrow());
        recurso.setMateria(materiaRepository.findById(materiaId).orElseThrow());
        return recursoRepository.save(recurso);
    }

    public List<Recurso> getByMateria(Long materiaId) {
        return recursoRepository.findByMateriaId(materiaId);
    }

    public List<Recurso> getByTutor(Long tutorId) {
        return recursoRepository.findByTutorId(tutorId);
    }
}
