package com.tutorias.tutorias_backend.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * DTO para la transferencia de información de disponibilidad específica de los tutores.
 * Permite gestionar bloques de tiempo únicos vinculados a una fecha y rango de horas.
 */
public class DispoEspecificaDTO {

    private Long id; // 👈 CRUCIAL: Añadido para que el frontend pueda borrar o editar este bloque

    @NotNull(message = "El ID del tutor es obligatorio")
    private Long tutorId;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fecha;

    @NotNull(message = "La hora de inicio es obligatoria")
    private LocalTime horaInicio;

    @NotNull(message = "La hora de fin es obligatoria")
    private LocalTime horaFin;

    private boolean estaDisponible = true;

    // ==========================================
    // CONSTRUCTORES (Necesarios para el Service)
    // ==========================================
    /** Constructor vacío para serialización. */
    public DispoEspecificaDTO() {
    }

    /**
     * Constructor con todos los campos.
     * @param id Identificador de la disponibilidad.
     * @param tutorId Identificador del tutor.
     * @param fecha Fecha de la disponibilidad.
     * @param horaInicio Hora de inicio.
     * @param horaFin Hora de fin.
     * @param estaDisponible Estado de disponibilidad.
     */
    public DispoEspecificaDTO(Long id, Long tutorId, LocalDate fecha, LocalTime horaInicio, LocalTime horaFin,
            boolean estaDisponible) {
        this.id = id;
        this.tutorId = tutorId;
        this.fecha = fecha;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.estaDisponible = estaDisponible;
    }

    // ==========================================
    // GETTERS Y SETTERS
    // ==========================================
    /** @return Identificador de la disponibilidad. */
    public Long getId() {
        return id;
    }

    /** @param id Identificador de la disponibilidad. */
    public void setId(Long id) {
        this.id = id;
    }

    /** @return Identificador del tutor. */
    public Long getTutorId() {
        return tutorId;
    }

    /** @param tutorId Identificador del tutor. */
    public void setTutorId(Long tutorId) {
        this.tutorId = tutorId;
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

    /** @return True si está disponible. */
    public boolean isEstaDisponible() {
        return estaDisponible;
    }

    /** @param estaDisponible Estado de disponibilidad del bloque. */
    public void setEstaDisponible(boolean estaDisponible) {
        this.estaDisponible = estaDisponible;
    }
}