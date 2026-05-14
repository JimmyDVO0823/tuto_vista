package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.entities.*;
import com.tutorias.tutorias_backend.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PerfilService {

    private final PerfilRepository perfilRepository;
    private final TutorRepository tutorRepository;
    private final EstudianteRepository estudianteRepository;

    @Transactional
    public Perfil actualizarBasico(Long id, String nombre, String avatar) {
        Perfil p = perfilRepository.findById(id).orElseThrow();
        p.setNombreCompleto(nombre);
        p.setUrlAvatar(avatar);
        return perfilRepository.save(p);
    }

    @Transactional
    public Tutor actualizarTutor(Long id, String biografia, String frase) {
        Tutor t = tutorRepository.findById(id).orElseThrow();
        t.setBiografia(biografia);
        t.setFrasePersonal(frase);
        return tutorRepository.save(t);
    }
}
