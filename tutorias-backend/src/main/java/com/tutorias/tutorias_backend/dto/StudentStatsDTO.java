package com.tutorias.tutorias_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentStatsDTO {
    private int upcomingSessionsCount;
    private int activeCoursesCount;
    private int notificationCount;
    private double semesterProgress;
}
