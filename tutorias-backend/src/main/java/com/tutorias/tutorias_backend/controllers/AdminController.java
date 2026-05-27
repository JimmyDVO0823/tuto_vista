package com.tutorias.tutorias_backend.controllers;

import com.tutorias.tutorias_backend.entities.Perfil;
import com.tutorias.tutorias_backend.repositories.PerfilRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final PerfilRepository perfilRepository;

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
