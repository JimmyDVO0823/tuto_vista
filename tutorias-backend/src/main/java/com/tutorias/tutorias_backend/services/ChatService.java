package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.ConversacionDTO;
import com.tutorias.tutorias_backend.dto.MensajeDTO;
import com.tutorias.tutorias_backend.dto.PerfilDTO;
import com.tutorias.tutorias_backend.entities.*;
import com.tutorias.tutorias_backend.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Servicio para la gestión de mensajería instantánea entre tutores y estudiantes.
 * Maneja la creación de conversaciones y el envío de mensajes con notificaciones integradas.
 */
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ConversacionRepository conversacionRepository;
    private final MensajeRepository mensajeRepository;
    private final PerfilRepository perfilRepository;
    private final NotificacionService notificacionService;

    /**
     * Busca una conversación existente entre dos perfiles o crea una nueva si no existe.
     * @param p1 ID del primer perfil.
     * @param p2 ID del segundo perfil.
     * @return ConversacionDTO con los datos de la conversación.
     */
    @Transactional
    public ConversacionDTO crearOObtenerConversacion(Long p1, Long p2) {
        // Buscar si ya existe una conversación entre ambos
        List<Conversacion> existentes = conversacionRepository.findExactConversation(p1, p2);
        if (!existentes.isEmpty()) {
            return toConvDTO(existentes.get(0));
        }

        Perfil perfil1 = perfilRepository.findById(p1).orElseThrow();
        Perfil perfil2 = perfilRepository.findById(p2).orElseThrow();

        Conversacion conv = new Conversacion();
        conv.getParticipantes().add(perfil1);
        conv.getParticipantes().add(perfil2);
        
        return toConvDTO(conversacionRepository.save(conv));
    }

    /**
     * Registra un nuevo mensaje en una conversación y envía una notificación al destinatario.
     * @param convId ID de la conversación.
     * @param remitenteId ID del perfil que envía el mensaje.
     * @param contenido Texto del mensaje.
     * @return MensajeDTO del mensaje guardado.
     */
    @Transactional
    public MensajeDTO enviarMensaje(Long convId, Long remitenteId, String contenido) {
        Conversacion conv = conversacionRepository.findById(convId).orElseThrow();
        Perfil remitente = perfilRepository.findById(remitenteId).orElseThrow();

        Mensaje mensaje = new Mensaje();
        mensaje.setConversacion(conv);
        mensaje.setRemitente(remitente);
        mensaje.setContenido(contenido);
        

        Mensaje guardado = mensajeRepository.save(mensaje);
        
        // Notificar al destinatario
        conv.getParticipantes().stream()
            .filter(p -> !p.getId().equals(remitenteId))
            .findFirst()
            .ifPresent(destinatario -> {
                String rolRemitente = remitente.getRol().name().toLowerCase();
                String msg;
                if (rolRemitente.equals("tutor")) {
                    // "Mensaje enviado por (profesor) de la materia (materia)"
                    // Buscamos una materia relacionada si es posible, o mensaje genérico
                    msg = String.format("Mensaje enviado por tutor %s", remitente.getNombreCompleto());
                } else {
                    // "Mensaje enviado por (estudiante) de (materia)"
                    msg = String.format("Mensaje enviado por estudiante %s", remitente.getNombreCompleto());
                }
                
                notificacionService.enviar(destinatario.getId(), 
                        com.tutorias.tutorias_backend.enums.TipoNotificacion.MENSAJE_RECIBIDO, 
                        "Nuevo mensaje", 
                        msg);
            });

        return toMsgDTO(guardado);
    }

    public List<MensajeDTO> getMensajes(Long convId) {
        return mensajeRepository.findByConversacionIdOrderByCreadoEnAsc(convId)
                .stream().map(this::toMsgDTO).toList();
    }

    public List<ConversacionDTO> getConversaciones(Long perfilId) {
        return conversacionRepository.findByPerfilId(perfilId)
                .stream().map(this::toConvDTO).toList();
    }

    @Transactional
    public void abandonarConversacion(Long convId, Long perfilId) {
        Conversacion conv = conversacionRepository.findById(convId).orElseThrow();
        Perfil perfil = perfilRepository.findById(perfilId).orElseThrow();
        conv.getParticipantes().remove(perfil);
        conversacionRepository.save(conv);
    }

    private MensajeDTO toMsgDTO(Mensaje m) {
        return MensajeDTO.builder()
                .id(m.getId())
                .conversacionId(m.getConversacion().getId())
                .remitenteId(m.getRemitente().getId())
                .remitenteNombre(m.getRemitente().getNombreCompleto())
                .contenido(m.getContenido())
                .leido(m.getLeido())
                .creadoEn(m.getCreadoEn())
                .build();
    }

    private ConversacionDTO toConvDTO(Conversacion c) {
        return ConversacionDTO.builder()
                .id(c.getId())
                .creadoEn(c.getCreadoEn())
                .participantes(c.getParticipantes().stream()
                        .map(p -> PerfilDTO.builder()
                                .id(p.getId())
                                .nombreCompleto(p.getNombreCompleto())
                                .urlAvatar(p.getUrlAvatar())
                                .rol(p.getRol().name())
                                .build())
                        .toList())
                .ultimoMensaje(c.getMensajes().isEmpty() ? null : toMsgDTO(c.getMensajes().get(c.getMensajes().size() - 1)))
                .build();
    }
}
