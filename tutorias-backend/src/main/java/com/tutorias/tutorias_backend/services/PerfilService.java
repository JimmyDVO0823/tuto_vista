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

    @org.springframework.transaction.annotation.Transactional
    public Tutor actualizarTutor(Long id, com.tutorias.tutorias_backend.dto.TutorUpdateDTO updateDto) {
        Tutor t = tutorRepository.findById(id).orElseThrow(() -> new RuntimeException("Tutor no encontrado"));
        t.setBiografia(updateDto.getBiografia());
        t.setFrasePersonal(updateDto.getFrase_personal());
        t.setPrecioPorHora(updateDto.getPrecio_por_hora());
        return tutorRepository.save(t);
    }
}
