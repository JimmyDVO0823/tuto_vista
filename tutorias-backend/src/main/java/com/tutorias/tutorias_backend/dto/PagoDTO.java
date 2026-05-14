package com.tutorias.tutorias_backend.dto;

import com.tutorias.tutorias_backend.enums.EstadoPago;
import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagoDTO {
    private Long id;
    private Long sesionId;
    private Long estudianteId;
    private Long tutorId;
    private BigDecimal monto;
    private BigDecimal comisionPlataforma;
    private BigDecimal pagoTutor;
    private String moneda;
    private EstadoPago estado;
    private OffsetDateTime pagadoEn;
    private OffsetDateTime creadoEn;
}
