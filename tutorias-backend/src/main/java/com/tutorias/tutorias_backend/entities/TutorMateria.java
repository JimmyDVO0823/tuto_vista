package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tutor_materias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorMateria {

    @EmbeddedId
    private TutorMateriaId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("tutorId")
    @JoinColumn(name = "tutor_id")
    private Tutor tutor;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("materiaId")
    @JoinColumn(name = "materia_id")
    private Materia materia;

    @Builder.Default
    @Column(nullable = false)
    private Boolean activo = true;
}
