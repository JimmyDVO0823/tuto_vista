package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "factura")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal impuesto = BigDecimal.ZERO;

    @Column(insertable = false, updatable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(nullable = false)
    @Builder.Default
    private String moneda = "COP";

    @Column(name = "emitida_en", nullable = false, updatable = false)
    @Builder.Default
    private OffsetDateTime emitidaEn = OffsetDateTime.now();
}
