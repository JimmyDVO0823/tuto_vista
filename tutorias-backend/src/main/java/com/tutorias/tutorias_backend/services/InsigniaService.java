package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.InsigniaDTO;
import com.tutorias.tutorias_backend.entities.Insignia;
import com.tutorias.tutorias_backend.repositories.InsigniaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InsigniaService {

    private final InsigniaRepository insigniaRepository;

    public List<InsigniaDTO> findAll() {
        return insigniaRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public InsigniaDTO create(InsigniaDTO dto) {
        Insignia insignia = Insignia.builder()
                .nombre(dto.getNombre())
                .descripcion(dto.getDescripcion())
                .urlIcono(dto.getUrlIcono())
                .condicionTipo(dto.getCondicionTipo())
                .condicionValor(dto.getCondicionValor())
                .build();

        return mapToDTO(insigniaRepository.save(insignia));
    }

    private InsigniaDTO mapToDTO(Insignia entity) {
        return InsigniaDTO.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .descripcion(entity.getDescripcion())
                .urlIcono(entity.getUrlIcono())
                .condicionTipo(entity.getCondicionTipo())
                .condicionValor(entity.getCondicionValor())
                .creadoEn(entity.getCreadoEn())
                .build();
    }
}
