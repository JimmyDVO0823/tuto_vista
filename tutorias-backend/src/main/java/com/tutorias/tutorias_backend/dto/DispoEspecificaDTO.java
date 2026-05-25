package com.tutorias.tutorias_backend.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

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
    public DispoEspecificaDTO() {
    }

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
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTutorId() {
        return tutorId;
    }

    public void setTutorId(Long tutorId) {
        this.tutorId = tutorId;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(LocalTime horaFin) {
        this.horaFin = horaFin;
    }

    public boolean isEstaDisponible() {
        return estaDisponible;
    }

    public void setEstaDisponible(boolean estaDisponible) {
        this.estaDisponible = estaDisponible;
    }
}