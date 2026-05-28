package com.tutorias.tutorias_backend.entities;

import com.tutorias.tutorias_backend.enums.EstadoActividad;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "actividad_estudiante")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActividadEstudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recurso_id")
    private Recurso recurso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estudiante_id", nullable = false)
    private Estudiante estudiante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sesion_id", nullable = false)
    private SesionTutoria sesion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EstadoActividad estado = EstadoActividad.pendiente;

    @Column(name = "comentario_tutor", columnDefinition = "TEXT")
    private String comentarioTutor;
}
