package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.ActividadEstudianteDTO;
import com.tutorias.tutorias_backend.dto.AsignarActividadRequest;
import com.tutorias.tutorias_backend.services.ActividadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/actividades")
@RequiredArgsConstructor
public class ActividadController {

    private final ActividadService actividadService;

    @PostMapping("/asignar")
    public ResponseEntity<ActividadEstudianteDTO> asignar(@RequestBody AsignarActividadRequest request) {
        String urlFinal = request.getUrlArchivo() != null ? request.getUrlArchivo() : request.getUrl();
        return ResponseEntity.ok(actividadService.asignarActividad(
                request.getSesionId(),
                request.getRecursoId(),
                request.getTitulo(),
                urlFinal,
                request.getDescripcion()));
    }

    @GetMapping("/estudiante/{id}/pendientes")
    public ResponseEntity<List<ActividadEstudianteDTO>> getPendientes(@PathVariable Long id) {
        return ResponseEntity.ok(actividadService.obtenerPendientesEstudiante(id));
    }
}
