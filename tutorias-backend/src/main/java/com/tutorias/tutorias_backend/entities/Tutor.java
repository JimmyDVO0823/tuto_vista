package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Table(name = "tutor")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "id")
public class Tutor extends Perfil {

    private String biografia;

    @Column(name = "frase_personal")
    private String frasePersonal;

    @Column(name = "anios_experiencia", nullable = false)
    private Integer aniosExperiencia = 0;

    @Column(name = "precio_por_hora", nullable = false)
    private BigDecimal precioPorHora = BigDecimal.ZERO;

    @Column(name = "duracion_sesion_min", nullable = false)
    private Integer duracionSesionMin = 90;

    @Column(name = "esta_disponible", nullable = false)
    private Boolean estaDisponible = true;

    @Column(name = "calificacion_promedio", nullable = false)
    private BigDecimal calificacionPromedio = BigDecimal.ZERO;

    @Column(name = "total_sesiones", nullable = false)
    private Integer totalSessions = 0;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "titulos", columnDefinition = "text[]")
    private List<String> titulos;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "logros", columnDefinition = "text[]")
    private List<String> logros;

    @Column(name = "creado_en", nullable = false, updatable = false)
    private OffsetDateTime creadoEnTutor = OffsetDateTime.now();
}
