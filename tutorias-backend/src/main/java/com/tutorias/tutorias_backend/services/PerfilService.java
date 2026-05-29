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
    public com.tutorias.tutorias_backend.dto.PerfilDTO actualizarBasico(Long id, String nombre, String avatar) {
        Perfil p = perfilRepository.findById(id).orElseThrow();
        p.setNombreCompleto(nombre);
        p.setUrlAvatar(avatar);
        return mapToDTO(perfilRepository.save(p));
    }

    private com.tutorias.tutorias_backend.dto.PerfilDTO mapToDTO(Perfil p) {
        return com.tutorias.tutorias_backend.dto.PerfilDTO.builder()
                .id(p.getId())
                .nombreCompleto(p.getNombreCompleto())
                .correo(p.getCorreo())
                .urlAvatar(p.getUrlAvatar())
                .rol(p.getRol().name())
                .build();
    }

    @org.springframework.transaction.annotation.Transactional
    public Tutor actualizarTutor(Long id, com.tutorias.tutorias_backend.dto.TutorUpdateDTO updateDto) {
        Tutor t = tutorRepository.findById(id).orElseThrow(() -> new RuntimeException("Tutor no encontrado"));
        if (updateDto.getBiografia() != null) t.setBiografia(updateDto.getBiografia());
        if (updateDto.getFrase_personal() != null) t.setFrasePersonal(updateDto.getFrase_personal());
        if (updateDto.getPrecio_por_hora() != null) t.setPrecioPorHora(updateDto.getPrecio_por_hora());
        if (updateDto.getAnios_experiencia() != null) t.setAniosExperiencia(updateDto.getAnios_experiencia());
        if (updateDto.getDuracion_sesion_min() != null) t.setDuracionSesionMin(updateDto.getDuracion_sesion_min());
        if (updateDto.getTitulos() != null) t.setTitulos(updateDto.getTitulos());
        if (updateDto.getLogros() != null) t.setLogros(updateDto.getLogros());
        return tutorRepository.save(t);
    }
}
