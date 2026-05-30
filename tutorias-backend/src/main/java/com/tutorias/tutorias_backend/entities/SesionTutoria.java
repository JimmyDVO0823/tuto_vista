package com.tutorias.tutorias_backend.entities;

import com.tutorias.tutorias_backend.enums.EstadoSesion;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

/**
 * Entidad que representa una sesión de tutoría programada, en progreso o finalizada.
 * Es el resultado de una solicitud aceptada y pagada.
 */
@Entity
@Table(name = "sesion_tutoria")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SesionTutoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Solicitud original que dio origen a esta sesión. */
    @OneToOne
    @JoinColumn(name = "solicitud_id", unique = true)
    private Solicitud solicitud;

    /** Tutor que imparte la sesión. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutor_id", nullable = false)
    private Tutor tutor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estudiante_id", nullable = false)
    private Estudiante estudiante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "materia_id", nullable = false)
    private Materia materia;

    @Column(name = "programada_para", nullable = false)
    private OffsetDateTime programadaPara;

    @Column(name = "duracion_min", nullable = false)
    private Integer duracionMin = 90;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio = BigDecimal.ZERO;

    @Column(name = "enlace_reunion")
    private String enlaceReunion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoSesion estado = EstadoSesion.programada;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cancelada_por")
    private Perfil canceladaPor;

    @Column(name = "motivo_cancelacion", columnDefinition = "TEXT")
    private String motivoCancelacion;

    @Column(name = "creado_en", nullable = false, updatable = false)
    private OffsetDateTime creadoEn = OffsetDateTime.now();
}
