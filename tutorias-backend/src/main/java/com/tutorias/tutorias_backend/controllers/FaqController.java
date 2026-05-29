package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.PreguntaDTO;
import com.tutorias.tutorias_backend.dto.TipoPreguntaDTO;
import com.tutorias.tutorias_backend.services.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faq")
@RequiredArgsConstructor
public class FaqController {

    private final FaqService faqService;

    @GetMapping
    public ResponseEntity<List<TipoPreguntaDTO>> getAllFaqs() {
        return ResponseEntity.ok(faqService.getAllFaqs());
    }

    @PostMapping("/tipos")
    public ResponseEntity<TipoPreguntaDTO> createTipo(@RequestBody TipoPreguntaDTO dto) {
        return ResponseEntity.ok(faqService.createTipo(dto));
    }

    @DeleteMapping("/tipos/{id}")
    public ResponseEntity<Void> deleteTipo(@PathVariable Long id) {
        faqService.deleteTipo(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/preguntas")
    public ResponseEntity<PreguntaDTO> createPregunta(@RequestBody PreguntaDTO dto) {
        return ResponseEntity.ok(faqService.createPregunta(dto));
    }

    @DeleteMapping("/preguntas/{id}")
    public ResponseEntity<Void> deletePregunta(@PathVariable Long id) {
        faqService.deletePregunta(id);
        return ResponseEntity.noContent().build();
    }
}
