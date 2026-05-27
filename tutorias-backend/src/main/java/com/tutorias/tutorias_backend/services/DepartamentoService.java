package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.DepartamentoDTO;
import com.tutorias.tutorias_backend.repositories.DepartamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartamentoService {

    private final DepartamentoRepository departamentoRepository;

    public List<DepartamentoDTO> getAllDepartamentos() {
        return departamentoRepository.findAll().stream()
                .map(d -> DepartamentoDTO.builder()
                        .id(d.getId())
                        .nombre(d.getNombre())
                        .build())
                .toList();
    }

    @org.springframework.transaction.annotation.Transactional
    public DepartamentoDTO create(DepartamentoDTO dto) {
        com.tutorias.tutorias_backend.entities.Departamento dept = com.tutorias.tutorias_backend.entities.Departamento.builder()
                .nombre(dto.getNombre())
                .build();
        
        com.tutorias.tutorias_backend.entities.Departamento guardado = departamentoRepository.save(dept);
        
        return DepartamentoDTO.builder()
                .id(guardado.getId())
                .nombre(guardado.getNombre())
                .build();
    }
}
