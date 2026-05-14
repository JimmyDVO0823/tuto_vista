package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidad que representa el perfil de un estudiante.
 * ID mapeado a BIGINT (referencia a perfiles).
 */
@Entity
@Table(name = "estudiante")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Estudiante {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Perfil perfil;

    @Column(name = "creado_en", nullable = false, updatable = false)
    private OffsetDateTime creadoEn = OffsetDateTime.now();

    @OneToMany(mappedBy = "estudiante")
    private List<Solicitud> solicitudes = new ArrayList<>();
}
