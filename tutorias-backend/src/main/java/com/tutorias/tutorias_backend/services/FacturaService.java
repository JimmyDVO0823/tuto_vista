package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.FacturaDTO;
import com.tutorias.tutorias_backend.entities.Factura;
import com.tutorias.tutorias_backend.repositories.FacturaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacturaService {

    private final FacturaRepository facturaRepository;

    public List<FacturaDTO> findAll() {
        return facturaRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public FacturaDTO create(FacturaDTO dto) {
        Factura factura = Factura.builder()
                .subtotal(dto.getSubtotal())
                .impuesto(dto.getImpuesto())
                .moneda(dto.getMoneda() != null ? dto.getMoneda() : "COP")
                .build();

        return mapToDTO(facturaRepository.save(factura));
    }

    private FacturaDTO mapToDTO(Factura entity) {
        return FacturaDTO.builder()
                .id(entity.getId())
                .subtotal(entity.getSubtotal())
                .impuesto(entity.getImpuesto())
                .total(entity.getTotal())
                .moneda(entity.getMoneda())
                .emitidaEn(entity.getEmitidaEn())
                .build();
    }
}
