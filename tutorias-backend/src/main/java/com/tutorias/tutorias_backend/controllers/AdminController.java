package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.entities.Perfil;
import com.tutorias.tutorias_backend.repositories.PerfilRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Controlador REST para funciones administrativas.
 * Permite la gestión de usuarios y sus estados dentro de la plataforma.
 */
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final PerfilRepository perfilRepository;

    /**
     * Lista todos los usuarios (perfiles) registrados en el sistema con información básica.
     *
     * @return ResponseEntity con una lista de mapas con los datos de los usuarios.
     */
    @GetMapping("/usuarios")
    public ResponseEntity<List<Map<String, Object>>> listarUsuarios() {
        List<Perfil> perfiles = perfilRepository.findAll();
        List<Map<String, Object>> response = perfiles.stream().map(p -> Map.<String, Object>of(
                "id", p.getId(),
                "nombreCompleto", p.getNombreCompleto(),
                "correo", p.getCorreo(),
                "rol", p.getRol().name(),
                "estaActivo", p.getEstaActivo()
        )).collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }

    /**
     * Alterna el estado de activación (activo/inactivo) de un usuario específico.
     *
     * @param id Identificador del perfil del usuario.
     * @param activo Nuevo estado de activación deseado.
     * @return ResponseEntity con el resultado de la operación y el nuevo estado.
     */
    @PatchMapping("/usuarios/{id}/estado")
    public ResponseEntity<Map<String, Object>> alternarEstadoUsuario(
            @PathVariable Long id,
            @RequestParam boolean activo) {
        Perfil perfil = perfilRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Perfil no encontrado"));
        
        perfil.setEstaActivo(activo);
        Perfil guardado = perfilRepository.save(perfil);
        
        return ResponseEntity.ok(Map.of(
                "id", guardado.getId(),
                "estaActivo", guardado.getEstaActivo(),
                "mensaje", "Estado del usuario actualizado correctamente."
        ));
    }
}
