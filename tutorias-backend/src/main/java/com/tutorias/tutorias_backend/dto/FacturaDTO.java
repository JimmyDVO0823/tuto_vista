package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacturaDTO {
    private Long id;
    private BigDecimal subtotal;
    private BigDecimal impuesto;
    private BigDecimal total;
    private String moneda;
    private OffsetDateTime emitidaEn;
}
