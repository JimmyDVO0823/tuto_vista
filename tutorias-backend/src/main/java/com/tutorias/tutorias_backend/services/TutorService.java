package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.MateriaDTO;
import com.tutorias.tutorias_backend.dto.TutorDTO;
import com.tutorias.tutorias_backend.dto.IngresoDto;
import com.tutorias.tutorias_backend.dto.TutorIncomeReportDto;
import com.tutorias.tutorias_backend.entities.Tutor;
import com.tutorias.tutorias_backend.entities.Pago;
import com.tutorias.tutorias_backend.enums.EstadoPago;
import com.tutorias.tutorias_backend.repositories.TutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.time.temporal.TemporalAdjusters;
import java.time.DayOfWeek;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TutorService {

    private final TutorRepository tutorRepository;
    private final com.tutorias.tutorias_backend.repositories.MateriaRepository materiaRepository;
    private final com.tutorias.tutorias_backend.repositories.SesionTutoriaRepository sesionTutoriaRepository;
    private final com.tutorias.tutorias_backend.repositories.PagoRepository pagoRepository;
    private final com.tutorias.tutorias_backend.repositories.ResenaRepository resenaRepository;

    /**
     * Obtiene el reporte detallado de ingresos agrupado por periodos.
     */
    public TutorIncomeReportDto getIncomeReport(Long tutorId) {
        List<Pago> pagos = pagoRepository.findByTutorIdAndEstadoOrderByCreadoEnAsc(tutorId, EstadoPago.completado);
        OffsetDateTime now = OffsetDateTime.now();

        // 1. Reporte Semana (Últimos 7 días)
        List<IngresoDto> semana = getSemanaReport(pagos, now);

        // 2. Reporte Mes (Semanas del mes actual)
        List<IngresoDto> mes = getMesReport(pagos, now);

        // 3. Reporte Año (Meses del año actual)
        List<IngresoDto> anio = getAnioReport(pagos, now);

        // 4. Reporte Todo (Historial por años)
        List<IngresoDto> todo = getTodoReport(pagos);

        return new TutorIncomeReportDto(semana, mes, anio, todo);
    }

    private List<IngresoDto> getSemanaReport(List<Pago> pagos, OffsetDateTime now) {
        OffsetDateTime startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).withHour(0).withMinute(0).withSecond(0).withNano(0);
        
        Map<DayOfWeek, Double> stats = new EnumMap<>(DayOfWeek.class);
        for (DayOfWeek day : DayOfWeek.values()) stats.put(day, 0.0);

        pagos.stream()
                .filter(p -> p.getCreadoEn() != null && !p.getCreadoEn().isBefore(startOfWeek))
                .forEach(p -> {
                    DayOfWeek day = p.getCreadoEn().getDayOfWeek();
                    double amount = p.getPagoTutor() != null ? p.getPagoTutor().doubleValue() : 0.0;
                    stats.put(day, stats.get(day) + amount);
                });

        String[] labels = {"Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"};
        DayOfWeek[] days = {DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY};
        
        List<IngresoDto> report = new ArrayList<>();
        for (int i = 0; i < labels.length; i++) {
            report.add(new IngresoDto(labels[i], stats.get(days[i])));
        }
        return report;
    }

    private List<IngresoDto> getMesReport(List<Pago> pagos, OffsetDateTime now) {
        OffsetDateTime startOfMonth = now.with(TemporalAdjusters.firstDayOfMonth()).withHour(0).withMinute(0).withSecond(0).withNano(0);
        
        Map<Integer, Double> stats = new HashMap<>();
        for (int i = 1; i <= 5; i++) stats.put(i, 0.0);

        pagos.stream()
                .filter(p -> p.getCreadoEn() != null && !p.getCreadoEn().isBefore(startOfMonth) && p.getCreadoEn().getMonth() == now.getMonth())
                .forEach(p -> {
                    int weekOfMonth = (p.getCreadoEn().getDayOfMonth() - 1) / 7 + 1;
                    if (weekOfMonth > 5) weekOfMonth = 5;
                    double amount = p.getPagoTutor() != null ? p.getPagoTutor().doubleValue() : 0.0;
                    stats.put(weekOfMonth, stats.get(weekOfMonth) + amount);
                });

        return stats.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(e -> new IngresoDto("Sem " + e.getKey(), e.getValue()))
                .collect(Collectors.toList());
    }

    private List<IngresoDto> getAnioReport(List<Pago> pagos, OffsetDateTime now) {
        OffsetDateTime startOfYear = now.with(TemporalAdjusters.firstDayOfYear()).withHour(0).withMinute(0).withSecond(0).withNano(0);
        
        java.time.Month[] months = java.time.Month.values();
        Map<java.time.Month, Double> stats = new EnumMap<>(java.time.Month.class);
        for (java.time.Month m : months) stats.put(m, 0.0);

        pagos.stream()
                .filter(p -> p.getCreadoEn() != null && !p.getCreadoEn().isBefore(startOfYear))
                .forEach(p -> {
                    java.time.Month month = p.getCreadoEn().getMonth();
                    double amount = p.getPagoTutor() != null ? p.getPagoTutor().doubleValue() : 0.0;
                    stats.put(month, stats.get(month) + amount);
                });

        String[] labels = {"Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"};
        List<IngresoDto> report = new ArrayList<>();
        for (int i = 0; i < labels.length; i++) {
            report.add(new IngresoDto(labels[i], stats.get(months[i])));
        }
        return report;
    }

    private List<IngresoDto> getTodoReport(List<Pago> pagos) {
        Map<Integer, Double> stats = new TreeMap<>();
        pagos.forEach(p -> {
            if (p.getCreadoEn() != null) {
                int year = p.getCreadoEn().getYear();
                double amount = p.getPagoTutor() != null ? p.getPagoTutor().doubleValue() : 0.0;
                stats.put(year, stats.getOrDefault(year, 0.0) + amount);
            }
        });

        return stats.entrySet().stream()
                .map(e -> new IngresoDto(String.valueOf(e.getKey()), e.getValue()))
                .collect(Collectors.toList());
    }

    /**
     * Obtiene estadísticas calculadas en tiempo real para el dashboard del tutor.
     */
    public com.tutorias.tutorias_backend.dto.TutorStatsDTO getTutorStats(Long tutorId) {
        java.time.OffsetDateTime now = java.time.OffsetDateTime.now();
        java.time.OffsetDateTime startOfMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);
        
        java.time.OffsetDateTime startOfLastMonth = startOfMonth.minusMonths(1);
        java.time.OffsetDateTime startOfCurrentMonth = startOfMonth;

        // 1. Horas dictadas este mes
        Long totalMin = sesionTutoriaRepository.sumDuracionMinByTutorAndMonth(tutorId, startOfMonth);
        Double hoursThisMonth = totalMin != null ? totalMin / 60.0 : 0.0;

        // 2. Calificación promedio
        Double averageRating = resenaRepository.avgPuntuacionByTutorId(tutorId);
        if (averageRating == null) {
            Tutor tutor = tutorRepository.findById(tutorId).orElse(null);
            averageRating = tutor != null ? tutor.getCalificacionPromedio().doubleValue() : 0.0;
        }

        // 3. Ingresos el mes pasado
        BigDecimal incomeLastMonth = pagoRepository.sumPagoTutorByTutorAndLastMonth(tutorId, startOfLastMonth, startOfCurrentMonth);
        if (incomeLastMonth == null) incomeLastMonth = BigDecimal.ZERO;

        return new com.tutorias.tutorias_backend.dto.TutorStatsDTO(hoursThisMonth, averageRating, incomeLastMonth);
    }

    /**
     * Asigna una materia a un tutor.
     */
    @org.springframework.transaction.annotation.Transactional
    public void asignarMateria(Long tutorId, Long materiaId) {
        Tutor tutor = tutorRepository.findById(tutorId)
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));
        com.tutorias.tutorias_backend.entities.Materia materia = materiaRepository.findById(materiaId)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada"));

        if (!tutor.getMaterias().contains(materia)) {
            tutor.getMaterias().add(materia);
            tutorRepository.save(tutor);
        }
    }

    /**
     * Obtiene un tutor por su ID.
     */
    public TutorDTO getTutorById(Long id) {
        Tutor tutor = tutorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));
        return toDTO(tutor);
    }

    /**
     * Obtiene todos los tutores disponibles con filtros opcionales.
     */
    public List<TutorDTO> getTutoresDisponibles(
            BigDecimal minPrecio,
            BigDecimal maxPrecio,
            BigDecimal minCalificacion,
            Long materiaId,
            Long departamentoId
    ) {
        return tutorRepository.findAll().stream()
                .filter(t -> t.getEstaDisponible())
                .filter(t -> minPrecio == null || t.getPrecioPorHora().compareTo(minPrecio) >= 0)
                .filter(t -> maxPrecio == null || t.getPrecioPorHora().compareTo(maxPrecio) <= 0)
                .filter(t -> minCalificacion == null || t.getCalificacionPromedio().compareTo(minCalificacion) >= 0)
                .filter(t -> materiaId == null || t.getMaterias().stream()
                        .anyMatch(m -> m.getId().equals(materiaId)))
                .filter(t -> departamentoId == null || t.getMaterias().stream()
                        .anyMatch(m -> m.getDepartamento().getId().equals(departamentoId)))
                .map(this::toDTO)
                .toList();
    }

    /**
     * Obtiene las materias asignadas a un tutor específico.
     */
    public List<MateriaDTO> getMateriasByTutor(Long tutorId) {
        Tutor tutor = tutorRepository.findById(tutorId)
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));

        return tutor.getMaterias().stream()
                .map(m -> MateriaDTO.builder()
                        .id(m.getId())
                        .nombre(m.getNombre())
                        .departamento_id(m.getDepartamento().getId())
                        .departamento_nombre(m.getDepartamento().getNombre())
                        .build())
                .toList();
    }

    /**
     * Mapeador de Tutor entidad a TutorDTO.
     */
    private TutorDTO toDTO(Tutor t) {
        List<MateriaDTO> materiasDTO = t.getMaterias() == null ? List.of() :
                t.getMaterias().stream()
                        .map(m -> MateriaDTO.builder()
                                .id(m.getId())
                                .nombre(m.getNombre())
                                .departamento_id(m.getDepartamento().getId())
                                .departamento_nombre(m.getDepartamento().getNombre())
                                .build())
                        .toList();

        return TutorDTO.builder()
                .id(t.getId())
                .nombre_completo(t.getPerfil().getNombreCompleto())
                .url_avatar(t.getPerfil().getUrlAvatar())
                .biografia(t.getBiografia())
                .frase_personal(t.getFrasePersonal())
                .precio_por_hora(t.getPrecioPorHora())
                .calificacion_promedio(t.getCalificacionPromedio())
                .total_sesiones(t.getTotalSesiones())
                .anios_experiencia(t.getAniosExperiencia())
                .esta_disponible(t.getEstaDisponible())
                .titulos(t.getTitulos())
                .logros(t.getLogros())
                .materias(materiasDTO)
                .build();
    }
}
