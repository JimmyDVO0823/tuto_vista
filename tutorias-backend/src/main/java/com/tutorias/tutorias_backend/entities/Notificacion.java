package com.tutorias.tutorias_backend.entities;

import com.tutorias.tutorias_backend.enums.TipoNotificacion;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

/**
 * Entidad que representa una notificación enviada a un usuario.
 */
@Entity
@Table(name = "notificaciones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Usuario al que va dirigida la notificación. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "perfil_id", nullable = false)
    private Perfil perfil;

    /** Tipo de notificación (SISTEMA, CHAT, SESION, etc.). */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoNotificacion tipo;

    /** Título de la notificación. */
    @Column(nullable = false)
    private String titulo;

    /** Cuerpo del mensaje o descripción de la notificación. */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String cuerpo;

    /** Indica si la notificación ha sido leída. */
    @Column(nullable = false)
    private Boolean leida = false;

    /** Fecha y hora de creación. */
    @Column(name = "creado_en", nullable = false, updatable = false)
    private OffsetDateTime creadoEn = OffsetDateTime.now();
}
