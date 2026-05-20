package com.tutorias.tutorias_backend.entities;

import com.tutorias.tutorias_backend.enums.EstadoEstudiantePlan;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "estudiante_plan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstudiantePlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "estudiante_id", nullable = false)
    private Estudiante estudiante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private PlanTutoria planTutoria;

    @Column(name = "sesiones_disponibles", nullable = false)
    private Integer sesionesDisponibles;

    @Column(name = "fecha_vencimiento", nullable = false)
    private LocalDate fechaVencimiento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EstadoEstudiantePlan estado = EstadoEstudiantePlan.ACTIVO;

    @Column(name = "creado_en", nullable = false, updatable = false)
    @Builder.Default
    private OffsetDateTime creadoEn = OffsetDateTime.now();
}
