package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.entities.Notificacion;
import com.tutorias.tutorias_backend.entities.Perfil;
import com.tutorias.tutorias_backend.repositories.NotificacionRepository;
import com.tutorias.tutorias_backend.repositories.PerfilRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificacionService {

    private final NotificacionRepository notificacionRepository;
    private final PerfilRepository perfilRepository;

    public void enviar(Long perfilId, String tipo, String titulo, String cuerpo) {
        Perfil perfil = perfilRepository.findById(perfilId).orElseThrow();
        
        Notificacion n = new Notificacion();
        n.setPerfil(perfil);
        n.setTipo(tipo);
        n.setTitulo(titulo);
        n.setCuerpo(cuerpo);
        
        notificacionRepository.save(n);
    }

    public List<Notificacion> getByPerfil(Long perfilId) {
        return notificacionRepository.findByPerfilId(perfilId);
    }

    public void marcarComoLeida(Long id) {
        Notificacion n = notificacionRepository.findById(id).orElseThrow();
        n.setLeida(true);
        notificacionRepository.save(n);
    }
}
