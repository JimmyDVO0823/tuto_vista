package com.tutorias.tutorias_backend.entities;

import com.tutorias.tutorias_backend.enums.TipoRecurso;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

/**
 * Entidad que representa un recurso educativo (video, documento, enlace, etc.) 
 * compartido por un tutor para una materia específica.
 */
@Entity
@Table(name = "recursos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Tutor que subió o compartió el recurso. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutor_id", nullable = false)
    private Tutor tutor;

    /** Materia académica a la que pertenece el recurso. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "materia_id", nullable = false)
    private Materia materia;

    /** Título descriptivo del recurso. */
    @Column(nullable = false)
    private String titulo;

    /** Breve descripción del contenido del recurso. */
    @Column(columnDefinition = "TEXT")
    private String descripcion;

    /** Ruta o URL hacia el archivo o recurso externo. */
    @Column(name = "url_archivo")
    private String urlArchivo;

    /** Tipo de recurso (DOCUMENTO, VIDEO, ENLACE, etc.). */
    @Enumerated(EnumType.STRING)
    private TipoRecurso tipo;

    /** Fecha y hora de publicación. */
    @Builder.Default
    @Column(name = "creado_en", nullable = false, updatable = false)
    private OffsetDateTime creadoEn = OffsetDateTime.now();
}
