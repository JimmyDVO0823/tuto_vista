package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.PagoDTO;
import com.tutorias.tutorias_backend.entities.*;
import com.tutorias.tutorias_backend.enums.EstadoPago;
import com.tutorias.tutorias_backend.repositories.PagoRepository;
import com.tutorias.tutorias_backend.repositories.SesionTutoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PagoService {

    private final PagoRepository pagoRepository;
    private final SesionTutoriaRepository sesionTutoriaRepository;
    private final com.tutorias.tutorias_backend.repositories.SolicitudRepository solicitudRepository;
    private final SesionTutoriaService sesionTutoriaService;
    private final NotificacionService notificacionService;
    private final ConfiguracionService configuracionService;

    @Transactional
    public PagoDTO registrarPagoYCrearSesion(Long solicitudId) {
        Solicitud solicitud = solicitudRepository.findById(solicitudId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        if (solicitud.getEstado() != com.tutorias.tutorias_backend.enums.EstadoSolicitud.aceptada) {
            throw new RuntimeException("La solicitud no está aceptada por el tutor. No se puede realizar el pago.");
        }

        // Crear la sesión a partir de la solicitud aceptada
        com.tutorias.tutorias_backend.dto.SesionTutoriaDTO sesionDto = sesionTutoriaService.crearDesdeSolicitud(solicitudId);
        SesionTutoria sesion = sesionTutoriaRepository.findById(sesionDto.getId())
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada después de crear"));

        Pago pago = new Pago();
        pago.setSesion(sesion);
        pago.setEstudiante(sesion.getEstudiante());
        pago.setTutor(sesion.getTutor());
        pago.setMonto(sesion.getPrecio());

        // Comisión dinámica obtenida de configuración
        BigDecimal tasaComision = configuracionService.obtenerComision();
        BigDecimal comision = sesion.getPrecio().multiply(tasaComision);
        pago.setComisionPlataforma(comision);

        pago.setEstado(EstadoPago.completado);
        pago.setPagadoEn(OffsetDateTime.now());

        Pago guardado = pagoRepository.save(pago);
        
        // Notificar al tutor: "Tutoría de (materia) pagada por (estudiante)"
        String msg = String.format("Tutoría de %s pagada por %s", 
                sesion.getMateria().getNombre(), 
                sesion.getEstudiante().getPerfil().getNombreCompleto());
        
        notificacionService.enviar(sesion.getTutor().getPerfil().getId(), 
                com.tutorias.tutorias_backend.enums.TipoNotificacion.SOLICITUD_TUTORIA, 
                "Pago recibido", 
                msg);

        return toDTO(guardado);
    }

    @Transactional
    public PagoDTO registrarPago(Long sesionId) {
        SesionTutoria sesion = sesionTutoriaRepository.findById(sesionId)
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada"));

        Pago pago = new Pago();
        pago.setSesion(sesion);
        pago.setEstudiante(sesion.getEstudiante());
        pago.setTutor(sesion.getTutor());
        pago.setMonto(sesion.getPrecio());
        
        // Comisión dinámica para la plataforma
        BigDecimal tasaComision = configuracionService.obtenerComision();
        BigDecimal comision = sesion.getPrecio().multiply(tasaComision);
        pago.setComisionPlataforma(comision);
        
        pago.setEstado(EstadoPago.completado);
        pago.setPagadoEn(OffsetDateTime.now());

        Pago guardadoPago = pagoRepository.save(pago);
        
        // Notificar al tutor: "Tutoría de (materia) pagada por (estudiante)"
        String msg2 = String.format("Tutoría de %s pagada por %s", 
                sesion.getMateria().getNombre(), 
                sesion.getEstudiante().getPerfil().getNombreCompleto());
        
        notificacionService.enviar(sesion.getTutor().getPerfil().getId(), 
                com.tutorias.tutorias_backend.enums.TipoNotificacion.SOLICITUD_TUTORIA, 
                "Pago recibido", 
                msg2);

        return toDTO(guardadoPago);
    }

    public List<PagoDTO> getByTutor(Long tutorId) {
        return pagoRepository.findByTutorId(tutorId)
                .stream().map(this::toDTO).toList();
    }

    private PagoDTO toDTO(Pago p) {
        return PagoDTO.builder()
                .id(p.getId())
                .sesionId(p.getSesion().getId())
                .estudianteId(p.getEstudiante().getId())
                .tutorId(p.getTutor().getId())
                .monto(p.getMonto())
                .comisionPlataforma(p.getComisionPlataforma())
                .pagoTutor(p.getMonto().subtract(p.getComisionPlataforma()))
                .moneda(p.getMoneda())
                .estado(p.getEstado())
                .pagadoEn(p.getPagadoEn())
                .creadoEn(p.getCreadoEn())
                .build();
    }
}
