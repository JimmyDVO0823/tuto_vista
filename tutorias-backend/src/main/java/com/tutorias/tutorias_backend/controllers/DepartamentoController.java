package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.DepartamentoDTO;
import com.tutorias.tutorias_backend.services.DepartamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador REST para la gestión de departamentos académicos.
 * Permite listar y crear departamentos dentro del sistema.
 */
@RestController
@RequestMapping("/departamentos")
@RequiredArgsConstructor
public class DepartamentoController {

    private final DepartamentoService departamentoService;

    /**
     * Obtiene la lista de todos los departamentos registrados.
     *
     * @return ResponseEntity con la lista de objetos DepartamentoDTO.
     */
    @GetMapping
    public ResponseEntity<List<DepartamentoDTO>> getAll() {
        return ResponseEntity.ok(departamentoService.getAllDepartamentos());
    }

    /**
     * Registra un nuevo departamento en el sistema.
     *
     * @param dto Datos del departamento a crear.
     * @return ResponseEntity con los detalles del departamento creado.
     */
    @PostMapping
    public ResponseEntity<DepartamentoDTO> create(@RequestBody DepartamentoDTO dto) {
        return ResponseEntity.ok(departamentoService.create(dto));
    }
}
