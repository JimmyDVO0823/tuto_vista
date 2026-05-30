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

    /** ID único del perfil, generado automáticamente. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nombre completo del usuario. */
    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    /** Correo electrónico institucional o personal, único en el sistema. */
    @Column(nullable = false, unique = true)
    private String correo;

    /** Hash de la contraseña del usuario (BCrypt). */
    @Column(name = "contrasena_hash", nullable = false)
    private String contrasenaHash;

    /** URL de la imagen de perfil del usuario. */
    @Column(name = "url_avatar")
    private String urlAvatar;

    /** Rol del usuario en la plataforma (ESTUDIANTE, TUTOR, ADMINISTRADOR). */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Rol rol;

    /** Indica si la cuenta del usuario está activa. */
    @Column(name = "esta_activo", nullable = false)
    @Builder.Default
    private Boolean estaActivo = true;

    /** Fecha y hora de creación del registro. */
    @Column(name = "creado_en", nullable = false, updatable = false)
    @Builder.Default
    private OffsetDateTime creadoEn = OffsetDateTime.now();

    // Relaciones 1:1
    @OneToOne(mappedBy = "perfil", cascade = CascadeType.ALL)
    private Tutor tutor;

    @OneToOne(mappedBy = "perfil", cascade = CascadeType.ALL)
    private Estudiante estudiante;
}
