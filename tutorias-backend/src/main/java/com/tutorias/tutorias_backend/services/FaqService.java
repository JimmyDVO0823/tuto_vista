package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.PreguntaDTO;
import com.tutorias.tutorias_backend.dto.TipoPreguntaDTO;
import com.tutorias.tutorias_backend.entities.Pregunta;
import com.tutorias.tutorias_backend.entities.TipoPregunta;
import com.tutorias.tutorias_backend.repositories.PreguntaRepository;
import com.tutorias.tutorias_backend.repositories.TipoPreguntaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final TipoPreguntaRepository tipoPreguntaRepository;
    private final PreguntaRepository preguntaRepository;

    @Transactional(readOnly = true)
    public List<TipoPreguntaDTO> getAllFaqs() {
        return tipoPreguntaRepository.findAll().stream()
                .map(this::mapToTipoDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public TipoPreguntaDTO createTipo(TipoPreguntaDTO dto) {
        TipoPregunta tipo = new TipoPregunta();
        tipo.setNombre(dto.getNombre());
        tipo.setIcono(dto.getIcono());
        return mapToTipoDTO(tipoPreguntaRepository.save(tipo));
    }

    @Transactional
    public void deleteTipo(Long id) {
        tipoPreguntaRepository.deleteById(id);
    }

    @Transactional
    public PreguntaDTO createPregunta(PreguntaDTO dto) {
        TipoPregunta tipo = tipoPreguntaRepository.findById(dto.getTipoId())
                .orElseThrow(() -> new RuntimeException("Tipo de pregunta no encontrado"));
        
        Pregunta pregunta = new Pregunta();
        pregunta.setTipo(tipo);
        pregunta.setPregunta(dto.getPregunta());
        pregunta.setRespuesta(dto.getRespuesta());
        
        return mapToPreguntaDTO(preguntaRepository.save(pregunta));
    }

    @Transactional
    public void deletePregunta(Long id) {
        preguntaRepository.deleteById(id);
    }

    private TipoPreguntaDTO mapToTipoDTO(TipoPregunta tipo) {
        return TipoPreguntaDTO.builder()
                .id(tipo.getId())
                .nombre(tipo.getNombre())
                .icono(tipo.getIcono())
                .preguntas(tipo.getPreguntas().stream()
                        .map(this::mapToPreguntaDTO)
                        .collect(Collectors.toList()))
                .build();
    }

    private PreguntaDTO mapToPreguntaDTO(Pregunta p) {
        return PreguntaDTO.builder()
                .id(p.getId())
                .tipoId(p.getTipo().getId())
                .pregunta(p.getPregunta())
                .respuesta(p.getRespuesta())
                .build();
    }
}
