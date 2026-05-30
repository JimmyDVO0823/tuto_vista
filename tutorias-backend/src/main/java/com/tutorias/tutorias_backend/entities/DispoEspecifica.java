package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Entidad que representa una disponibilidad de horario específica para un tutor.
 * Define la fecha, hora de inicio, hora de fin y si el bloque está disponible.
 */
@Entity
@Table(name = "disponibilidad_especifica")
public class DispoEspecifica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutor_id", nullable = false)
    @JsonIgnoreProperties({ "disponibilidades", "disponibilidadesEspecificas", "perfil", "usuario" }) // EVITA EL BUCLE
                                                                                                      // INFINITO
    private Tutor tutor;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fin", nullable = false)
    private LocalTime horaFin;

    @Column(name = "esta_disponible", nullable = false)
    private boolean estaDisponible = true;

    @Column(name = "creado_en", nullable = false, updatable = false)
    private ZonedDateTime creadoEn = ZonedDateTime.now();

    // Getters y Setters
    /** @return Identificador único de la disponibilidad. */
    public Long getId() {
        return id;
    }

    /** @param id Identificador único de la disponibilidad. */
    public void setId(Long id) {
        this.id = id;
    }

    /** @return Tutor asociado a esta disponibilidad. */
    public Tutor getTutor() {
        return tutor;
    }

    /** @param tutor Tutor asociado a esta disponibilidad. */
    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }

    /** @return Fecha de la disponibilidad. */
    public LocalDate getFecha() {
        return fecha;
    }

    /** @param fecha Fecha de la disponibilidad. */
    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    /** @return Hora de inicio del bloque. */
    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    /** @param horaInicio Hora de inicio del bloque. */
    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    /** @return Hora de fin del bloque. */
    public LocalTime getHoraFin() {
        return horaFin;
    }

    /** @param horaFin Hora de fin del bloque. */
    public void setHoraFin(LocalTime horaFin) {
        this.horaFin = horaFin;
    }

    /** @return True si el bloque está disponible, false en caso contrario. */
    public boolean isEstaDisponible() {
        return estaDisponible;
    }

    /** @param estaDisponible Estado de disponibilidad del bloque. */
    public void setEstaDisponible(boolean estaDisponible) {
        this.estaDisponible = estaDisponible;
    }

    /** @return Fecha y hora de creación del registro. */
    public ZonedDateTime getCreadoEn() {
        return creadoEn;
    }

    /** @param creadoEn Fecha y hora de creación del registro. */
    public void setCreadoEn(ZonedDateTime creadoEn) {
        this.creadoEn = creadoEn;
    }
}