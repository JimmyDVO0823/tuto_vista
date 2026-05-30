package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entidad que representa una materia académica.
 * Pertenece a un departamento específico.
 */
@Entity
@Table(name = "materia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nombre de la materia académica. */
    @Column(nullable = false)
    private String nombre;

    /** Departamento al que pertenece la materia. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departamento_id", nullable = false)
    private Departamento departamento;
}
