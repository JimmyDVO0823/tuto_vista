package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.ActividadEstudianteDTO;
import com.tutorias.tutorias_backend.services.ActividadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/actividades")
@RequiredArgsConstructor
public class ActividadController {

    private final ActividadService actividadService;

    @PostMapping("/asignar")
    public ResponseEntity<ActividadEstudianteDTO> asignar(@RequestBody Map<String, Object> payload) {
        Long sesionId = Long.valueOf(payload.get("sesionId").toString());
        String titulo = payload.get("titulo").toString();
        String url = payload.get("url").toString();
        String descripcion = payload.getOrDefault("descripcion", "").toString();

        return ResponseEntity.ok(actividadService.asignarActividad(sesionId, titulo, url, descripcion));
    }

    @GetMapping("/estudiante/{id}/pendientes")
    public ResponseEntity<List<ActividadEstudianteDTO>> getPendientes(@PathVariable Long id) {
        return ResponseEntity.ok(actividadService.obtenerPendientesEstudiante(id));
    }
}
