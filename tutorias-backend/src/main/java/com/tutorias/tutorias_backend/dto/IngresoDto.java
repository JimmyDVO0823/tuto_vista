package com.tutorias.tutorias_backend.dto;

public class IngresoDto {
    private String label;      // Ej: "Lun", "Sem 1", "Ene"
    private Double ingresos;   // Ej: 120.0, 1400.0

    public IngresoDto(String label, Double ingresos) {
        this.label = label;
        this.ingresos = ingresos;
    }

    // Getters y Setters
    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
    public Double getIngresos() { return ingresos; }
    public void setIngresos(Double ingresos) { this.ingresos = ingresos; }
}