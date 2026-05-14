package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "estudiante")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Estudiante {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Perfil perfil;

    @Column(name = "creado_en", insertable = false, updatable = false)
    private OffsetDateTime creadoEn;
}
