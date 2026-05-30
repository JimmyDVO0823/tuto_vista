package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

/**
 * Entidad que representa un mensaje individual dentro de una conversación.
 */
@Entity
@Table(name = "mensajes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Conversación a la que pertenece el mensaje. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversacion_id", nullable = false)
    private Conversacion conversacion;

    /** Usuario que envió el mensaje. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "remitente_id", nullable = false)
    private Perfil remitente;

    /** Contenido textual del mensaje. */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String contenido;

    /** Indica si el mensaje ha sido leído por el destinatario (visto). */
    @Column(nullable = false)
    private Boolean leido = false;

    /** Fecha y hora de envío. */
    @Column(name = "creado_en", nullable = false, updatable = false)
    private OffsetDateTime creadoEn = OffsetDateTime.now();
}
