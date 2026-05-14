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

    @Transactional
    public PagoDTO registrarPago(Long sesionId) {
        SesionTutoria sesion = sesionTutoriaRepository.findById(sesionId)
                .orElseThrow(() -> new RuntimeException("Sesión no encontrada"));

        Pago pago = new Pago();
        pago.setSesion(sesion);
        pago.setEstudiante(sesion.getEstudiante());
        pago.setTutor(sesion.getTutor());
        pago.setMonto(sesion.getPrecio());
        
        // Comisión fija del 10% para la plataforma por ejemplo
        BigDecimal comision = sesion.getPrecio().multiply(new BigDecimal("0.10"));
        pago.setComisionPlataforma(comision);
        
        pago.setEstado(EstadoPago.completado);
        pago.setPagadoEn(OffsetDateTime.now());

        return toDTO(pagoRepository.save(pago));
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
