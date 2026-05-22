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

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ConversacionRepository conversacionRepository;
    private final MensajeRepository mensajeRepository;
    private final PerfilRepository perfilRepository;

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

    @Transactional
    public MensajeDTO enviarMensaje(Long convId, Long remitenteId, String contenido) {
        Conversacion conv = conversacionRepository.findById(convId).orElseThrow();
        Perfil remitente = perfilRepository.findById(remitenteId).orElseThrow();

        Mensaje mensaje = new Mensaje();
        mensaje.setConversacion(conv);
        mensaje.setRemitente(remitente);
        mensaje.setContenido(contenido);
        
        return toMsgDTO(mensajeRepository.save(mensaje));
    }

    public List<MensajeDTO> getMensajes(Long convId) {
        return mensajeRepository.findByConversacionIdOrderByCreadoEnAsc(convId)
                .stream().map(this::toMsgDTO).toList();
    }

    public List<ConversacionDTO> getConversaciones(Long perfilId) {
        return conversacionRepository.findByPerfilId(perfilId)
                .stream().map(this::toConvDTO).toList();
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
