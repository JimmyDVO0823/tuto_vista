package com.tutorias.tutorias_backend.dto;

import java.math.BigDecimal;

public record TutorStatsDTO(
    Double hoursThisMonth,
    Double averageRating,
    BigDecimal incomeLastMonth
) {}
