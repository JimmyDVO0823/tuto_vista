package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Table(name = "tutor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tutor {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Perfil perfil;

    private String biografia;
    
    @Column(name = "frase_personal")
    private String frasePersonal;

    @Builder.Default
    @Column(name = "anios_experiencia")
    private Integer aniosExperiencia = 0;

    @Builder.Default
    @Column(name = "precio_por_hora")
    private BigDecimal precioPorHora = BigDecimal.ZERO;

    @Builder.Default
    @Column(name = "duracion_sesion_min")
    private Integer duracionSesionMin = 90;

    @Builder.Default
    @Column(name = "esta_disponible")
    private Boolean estaDisponible = true;

    @Builder.Default
    @Column(name = "calificacion_promedio")
    private BigDecimal calificacionPromedio = BigDecimal.ZERO;

    @Builder.Default
    @Column(name = "total_sesiones")
    private Integer totalSesiones = 0;

    // Nota: Para los arrays de PostgreSQL usaremos una anotación especial o simplemente List<String>
    // Dependiendo de la configuración, String[] es lo más directo.
    private String[] titulos;
    private String[] logros;

    @Column(name = "creado_en", insertable = false, updatable = false)
    private OffsetDateTime creadoEn;
}
