package com.tutorias.tutorias_backend.dto;

import java.util.List;

public record TutorIncomeReportDto(
    List<IngresoDto> semana,
    List<IngresoDto> mes,
    List<IngresoDto> anio,
    List<IngresoDto> todo
) {}
