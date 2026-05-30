package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.DepartamentoDTO;
import com.tutorias.tutorias_backend.repositories.DepartamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Servicio para la gestión de departamentos académicos.
 */
@Service
@RequiredArgsConstructor
public class DepartamentoService {

    private final DepartamentoRepository departamentoRepository;

    /**
     * Obtiene la lista completa de departamentos académicos registrados en el sistema.
     *
     * @return Lista de objetos DepartamentoDTO.
     */
    public List<DepartamentoDTO> getAllDepartamentos() {
        return departamentoRepository.findAll().stream()
                .map(d -> DepartamentoDTO.builder()
                        .id(d.getId())
                        .nombre(d.getNombre())
                        .build())
                .toList();
    }

    /**
     * Crea un nuevo departamento académico.
     *
     * @param dto Datos del departamento a crear.
     * @return DepartamentoDTO con los detalles del departamento guardado.
     */
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
