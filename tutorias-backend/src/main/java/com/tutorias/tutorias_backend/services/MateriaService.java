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
    private final com.tutorias.tutorias_backend.repositories.DepartamentoRepository departamentoRepository;

    public List<MateriaDTO> getAllMaterias() {
        return materiaRepository.findAll().stream()
                .map(m -> MateriaDTO.builder()
                        .id(m.getId())
                        .nombre(m.getNombre())
                        .departamento_id(m.getDepartamento().getId())
                        .departamento_nombre(m.getDepartamento().getNombre())
                        .build())
                .toList();
    }

    public List<MateriaDTO> getMateriasByDepartamento(Long departamentoId) {
        return materiaRepository.findByDepartamentoId(departamentoId).stream()
                .map(m -> MateriaDTO.builder()
                        .id(m.getId())
                        .nombre(m.getNombre())
                        .departamento_id(m.getDepartamento().getId())
                        .departamento_nombre(m.getDepartamento().getNombre())
                        .build())
                .toList();
    }

    @org.springframework.transaction.annotation.Transactional
    public MateriaDTO create(MateriaDTO dto) {
        com.tutorias.tutorias_backend.entities.Departamento dept = departamentoRepository.findById(dto.getDepartamento_id())
                .orElseThrow(() -> new RuntimeException("Departamento no encontrado"));
        
        com.tutorias.tutorias_backend.entities.Materia materia = com.tutorias.tutorias_backend.entities.Materia.builder()
                .nombre(dto.getNombre())
                .departamento(dept)
                .build();
        
        com.tutorias.tutorias_backend.entities.Materia guardada = materiaRepository.save(materia);
        
        return MateriaDTO.builder()
                .id(guardada.getId())
                .nombre(guardada.getNombre())
                .departamento_id(guardada.getDepartamento().getId())
                .departamento_nombre(guardada.getDepartamento().getNombre())
                .build();
    }
}
