package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;

@Entity
@Table(name = "estudiante")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "id")
public class Estudiante extends Perfil {

    @Column(name = "creado_en", nullable = false, updatable = false)
    private OffsetDateTime creadoEnEstudiante = OffsetDateTime.now();
}
