package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
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

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Perfil perfil;

    @Column(columnDefinition = "TEXT")
    private String biografia;

    @Column(name = "frase_personal", columnDefinition = "TEXT")
    private String frasePersonal;

    @Column(name = "anios_experiencia", nullable = false)
    private Integer aniosExperiencia = 0;

    @Column(name = "precio_por_hora", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioPorHora = BigDecimal.ZERO;

    @Column(name = "duracion_sesion_min", nullable = false)
    private Integer duracionSesionMin = 90;

    @Column(name = "esta_disponible", nullable = false)
    private Boolean estaDisponible = true;

    @Column(name = "calificacion_promedio", nullable = false, precision = 3, scale = 2)
    private BigDecimal calificacionPromedio = BigDecimal.ZERO;

    @Column(name = "total_sesiones", nullable = false)
    private Integer totalSesiones = 0;

    @Column(name = "titulos")
    private String[] titulos;

    @Column(name = "logros")
    private String[] logros;

    @Column(name = "creado_en", nullable = false, updatable = false)
    private OffsetDateTime creadoEn = OffsetDateTime.now();

    // Relaciones
    @ManyToMany
    @JoinTable(
        name = "tutor_materias",
        joinColumns = @JoinColumn(name = "tutor_id"),
        inverseJoinColumns = @JoinColumn(name = "materia_id")
    )
    private Set<Materia> materias;

    @OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Disponibilidad> disponibilidades = new ArrayList<>();

    @OneToMany(mappedBy = "tutor")
    private List<Solicitud> solicitudes = new ArrayList<>();
}
