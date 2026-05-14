package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.MateriaDTO;
import com.tutorias.tutorias_backend.repositories.MateriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MateriaService {

    private final MateriaRepository materiaRepository;

    public List<MateriaDTO> getAllMaterias() {
        return materiaRepository.findAll().stream()
                .map(m -> MateriaDTO.builder()
                        .id(m.getId())
                        .nombre(m.getNombre())
                        .departamentoId(m.getDepartamento().getId())
                        .departamentoNombre(m.getDepartamento().getNombre())
                        .build())
                .toList();
    }

    public List<MateriaDTO> getMateriasByDepartamento(Long departamentoId) {
        return materiaRepository.findByDepartamentoId(departamentoId).stream()
                .map(m -> MateriaDTO.builder()
                        .id(m.getId())
                        .nombre(m.getNombre())
                        .departamentoId(m.getDepartamento().getId())
                        .departamentoNombre(m.getDepartamento().getNombre())
                        .build())
                .toList();
    }
}
