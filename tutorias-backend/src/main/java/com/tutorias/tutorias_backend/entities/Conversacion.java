package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidad que representa una conversación de chat entre dos o más participantes.
 * Almacena la fecha de creación y la relación con los mensajes y participantes.
 */
@Entity
@Table(name = "conversacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Conversacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "creado_en", nullable = false, updatable = false)
    private OffsetDateTime creadoEn = OffsetDateTime.now();

    @OneToMany(mappedBy = "conversacion", cascade = CascadeType.ALL)
    private List<Mensaje> mensajes = new ArrayList<>();

    /** Lista de participantes en la conversación. */
    @ManyToMany
    @JoinTable(
        name = "conversacion_participantes",
        joinColumns = @JoinColumn(name = "conversacion_id"),
        inverseJoinColumns = @JoinColumn(name = "perfil_id")
    )
    private List<Perfil> participantes = new ArrayList<>();
}
