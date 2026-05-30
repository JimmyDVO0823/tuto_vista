package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entidad que representa un parámetro de configuración global del sistema.
 * Se utiliza para almacenar pares clave-valor de configuraciones persistentes.
 */
@Entity
@Table(name = "configuracion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Configuracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String clave;

    @Column(nullable = false)
    private String valor;
}
