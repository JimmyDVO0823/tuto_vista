package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entidad que representa un departamento académico dentro de la institución.
 * Agrupa materias y tutores vinculados a un área específica del conocimiento.
 */
@Entity
@Table(name = "departamento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nombre único del departamento académico. */
    @Column(nullable = false, unique = true)
    private String nombre;
}
