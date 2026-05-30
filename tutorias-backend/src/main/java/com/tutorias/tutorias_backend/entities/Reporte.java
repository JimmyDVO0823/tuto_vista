package com.tutorias.tutorias_backend.entities;

import com.tutorias.tutorias_backend.enums.EstadoReporte;
import com.tutorias.tutorias_backend.enums.MotivoReporte;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

/**
 * Entidad que registra reportes o denuncias entre usuarios.
 */
@Entity
@Table(name = "reporte")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reporte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reportado_por", nullable = false)
    private Perfil reportadoPor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reportado_a", nullable = false)
    private Perfil reportadoA;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sesion_id")
    private SesionTutoria sesion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MotivoReporte motivo;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EstadoReporte estado = EstadoReporte.PENDIENTE;

    @Column(name = "creado_en", nullable = false, updatable = false)
    @Builder.Default
    private OffsetDateTime creadoEn = OffsetDateTime.now();
}
