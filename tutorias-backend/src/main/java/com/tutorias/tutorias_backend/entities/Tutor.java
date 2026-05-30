package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Entidad que representa el perfil detallado de un tutor.
 * ID mapeado a BIGINT (referencia a perfiles).
 */
@Entity
@Table(name = "tutor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tutor {

    /** Identificador único del tutor, coincide con el ID de Perfil. */
    @Id
    private Long id;

    /** Perfil de usuario asociado (Relación 1:1). */
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Perfil perfil;

    /** Biografía detallada del tutor. */
    @Column(columnDefinition = "TEXT")
    private String biografia;

    /** Frase corta de presentación personal. */
    @Column(name = "frase_personal", columnDefinition = "TEXT")
    private String frasePersonal;

    /** Años de experiencia académica o profesional. */
    @Column(name = "anios_experiencia", nullable = false)
    private Integer aniosExperiencia = 0;

    /** Tarifa por hora de tutoría. */
    @Column(name = "precio_por_hora", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioPorHora = BigDecimal.ZERO;

    /** Duración estándar sugerida de las sesiones en minutos. */
    @Column(name = "duracion_sesion_min", nullable = false)
    private Integer duracionSesionMin = 90;

    /** Estado de disponibilidad general para nuevas tutorías. */
    @Column(name = "esta_disponible", nullable = false)
    private Boolean estaDisponible = true;

    /** Promedio de calificación dado por los estudiantes (1.0 - 5.0). */
    @Column(name = "calificacion_promedio", nullable = false, precision = 3, scale = 2)
    private BigDecimal calificacionPromedio = BigDecimal.ZERO;

    /** Número total de sesiones realizadas por el tutor. */
    @Column(name = "total_sesiones", nullable = false)
    private Integer totalSesiones = 0;

    @Column(name = "titulos")
    private String[] titulos;

    @Column(name = "logros")
    private String[] logros;

    @Column(name = "creado_en", nullable = false, updatable = false)
    private OffsetDateTime creadoEn = OffsetDateTime.now();

    // Relaciones
    @OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TutorMateria> tutorMaterias = new HashSet<>();

    @OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Disponibilidad> disponibilidades = new ArrayList<>();

    @OneToMany(mappedBy = "tutor")
    private List<Solicitud> solicitudes = new ArrayList<>();

    @OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TutorInsignia> insignias = new ArrayList<>();
}
