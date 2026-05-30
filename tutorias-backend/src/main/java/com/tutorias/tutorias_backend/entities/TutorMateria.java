package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entidad asociativa que vincula a un tutor con las materias que imparte.
 */
@Entity
@Table(name = "tutor_materias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorMateria {

    /** Identificador compuesto (tutor_id, materia_id). */
    @EmbeddedId
    private TutorMateriaId id;

    /** Tutor asociado. */
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("tutorId")
    @JoinColumn(name = "tutor_id")
    private Tutor tutor;

    /** Materia asociada. */
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("materiaId")
    @JoinColumn(name = "materia_id")
    private Materia materia;

    /** Indica si el tutor actualmente imparte esta materia. */
    @Builder.Default
    @Column(nullable = false)
    private Boolean activo = true;
}
