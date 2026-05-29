package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.enums.TipoNotificacion;
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

    public void enviar(Long perfilId, TipoNotificacion tipo, String titulo, String cuerpo) {
        Perfil perfil = perfilRepository.findById(perfilId).orElseThrow();
        
        Notificacion n = new Notificacion();
        n.setPerfil(perfil);
        n.setTipo(tipo);
        n.setTitulo(titulo);
        n.setCuerpo(cuerpo);
        
        notificacionRepository.save(n);
    }

    public List<Notificacion> getByPerfil(Long perfilId) {
        return notificacionRepository.findByPerfilIdOrderByCreadoEnDesc(perfilId);
    }

    public List<Notificacion> getUnreadByPerfil(Long perfilId) {
        return notificacionRepository.findByPerfilIdAndLeidaFalse(perfilId);
    }

    public List<com.tutorias.tutorias_backend.dto.NotificationResponseDTO> getNotificationsByUserId(Long userId) {
        List<Notificacion> notificaciones = notificacionRepository.findByPerfilIdOrderByCreadoEnDesc(userId);
        java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        
        return notificaciones.stream()
                .map(n -> com.tutorias.tutorias_backend.dto.NotificationResponseDTO.builder()
                        .id(n.getId())
                        .user(n.getTitulo())
                        .msg(n.getCuerpo())
                        .time(n.getCreadoEn().format(formatter))
                        .tipo(n.getTipo().name())
                        .leida(n.getLeida())
                        .build())
                .collect(java.util.stream.Collectors.toList());
    }

    public void marcarComoLeida(Long id) {
        Notificacion n = notificacionRepository.findById(id).orElseThrow();
        n.setLeida(true);
        notificacionRepository.save(n);
    }

    @org.springframework.transaction.annotation.Transactional
    public void marcarTodasComoLeidas(Long perfilId) {
        List<Notificacion> unread = notificacionRepository.findByPerfilIdAndLeidaFalse(perfilId);
        unread.forEach(n -> n.setLeida(true));
        notificacionRepository.saveAll(unread);
    }
}
