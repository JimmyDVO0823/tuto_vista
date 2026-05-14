package com.tutorias.tutorias_backend.entities;

import com.tutorias.tutorias_backend.enums.Rol;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

/**
 * Entidad base para todos los perfiles de usuario.
 * ID mapeado a BIGSERIAL en la base de datos.
 */
@Entity
@Table(name = "perfiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    @Column(nullable = false, unique = true)
    private String correo;

    @Column(name = "contrasena_hash", nullable = false)
    private String contrasenaHash;

    @Column(name = "url_avatar")
    private String urlAvatar;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;

    @Column(name = "esta_activo", nullable = false)
    @Builder.Default
    private Boolean estaActivo = true;

    @Column(name = "creado_en", nullable = false, updatable = false)
    @Builder.Default
    private OffsetDateTime creadoEn = OffsetDateTime.now();

    // Relaciones 1:1
    @OneToOne(mappedBy = "perfil", cascade = CascadeType.ALL)
    private Tutor tutor;

    @OneToOne(mappedBy = "perfil", cascade = CascadeType.ALL)
    private Estudiante estudiante;
}
