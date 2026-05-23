package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.SemesterProgressResponseDTO;
import com.tutorias.tutorias_backend.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador para operaciones relacionadas con el estudiante.
 */
@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/{id}/semester-progress")
    public ResponseEntity<SemesterProgressResponseDTO> getSemesterProgress(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getSemesterProgress(id));
    }
}
