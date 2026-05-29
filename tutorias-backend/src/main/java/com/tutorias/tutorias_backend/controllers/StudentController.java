package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.dto.SemesterProgressResponseDTO;
import com.tutorias.tutorias_backend.dto.StudentMateriaDTO;
import com.tutorias.tutorias_backend.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Controlador para operaciones relacionadas con el estudiante.
 */
@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/{id}/sessions-progress")
    public ResponseEntity<SemesterProgressResponseDTO> getSessionsProgress(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getSessionsProgress(id));
    }

    @GetMapping("/{id}/activities-progress")
    public ResponseEntity<SemesterProgressResponseDTO> getActivitiesProgress(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getActivitiesProgress(id));
    }

    @GetMapping("/{id}/semester-progress")
    public ResponseEntity<SemesterProgressResponseDTO> getSemesterProgress(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getSemesterProgress(id));
    }

    @GetMapping("/{id}/materias")
    public ResponseEntity<List<StudentMateriaDTO>> getStudentMaterias(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentMaterias(id));
    }
}
