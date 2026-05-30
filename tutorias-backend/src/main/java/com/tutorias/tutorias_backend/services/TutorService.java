package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.InsigniaDTO;
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
import org.springframework.transaction.annotation.Transactional;
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
     * @param tutorId ID del tutor.
     * @return TutorStatsDTO con horas dictadas, calificación e ingresos mensuales.
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
     * Actualiza la tarifa por hora de un tutor.
     */
    @org.springframework.transaction.annotation.Transactional
    public void actualizarPrecio(Long tutorId, BigDecimal nuevoPrecio) {
        Tutor tutor = tutorRepository.findById(tutorId)
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));
        tutor.setPrecioPorHora(nuevoPrecio);
        tutorRepository.save(tutor);
    }

    /**
     * Obtiene un tutor por su ID y lo convierte a DTO.
     * @param id ID del tutor.
     * @return TutorDTO con todos los detalles del tutor.
     */
    public TutorDTO getTutorById(Long id) {
        Tutor tutor = tutorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));
        return toDTO(tutor);
    }

    /**
     * Obtiene todos los tutores disponibles filtrados por nombre, precio, materia, etc.
     * @return TutoresPaginadosDTO con los resultados de la búsqueda.
     */
    public com.tutorias.tutorias_backend.dto.TutoresPaginadosDTO getTutoresDisponibles(
            String nombre,
            BigDecimal minPrecio,
            BigDecimal maxPrecio,
            BigDecimal minCalificacion,
            Long materiaId,
            Long departamentoId,
            int page,
            int size
    ) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size, org.springframework.data.domain.Sort.by("id").ascending());

        org.springframework.data.jpa.domain.Specification<Tutor> spec = (root, query, cb) -> {
            List<jakarta.persistence.criteria.Predicate> predicates = new ArrayList<>();
            
            // Siempre deben estar disponibles
            predicates.add(cb.isTrue(root.get("estaDisponible")));

            if (nombre != null && !nombre.isBlank()) {
                String pattern = "%" + nombre.toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get("perfil").get("nombreCompleto")), pattern));
            }

            if (minPrecio != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("precioPorHora"), minPrecio));
            }
            if (maxPrecio != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("precioPorHora"), maxPrecio));
            }
            if (minCalificacion != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("calificacionPromedio"), minCalificacion));
            }

            if (materiaId != null || departamentoId != null) {
                jakarta.persistence.criteria.Join<Tutor, com.tutorias.tutorias_backend.entities.TutorMateria> materiasJoin = root.join("tutorMaterias");
                predicates.add(cb.isTrue(materiasJoin.get("activo")));

                if (materiaId != null) {
                    predicates.add(cb.equal(materiasJoin.get("materia").get("id"), materiaId));
                }
                if (departamentoId != null) {
                    predicates.add(cb.equal(materiasJoin.get("materia").get("departamento").get("id"), departamentoId));
                }
                
                // Evitar duplicados por los joins
                query.distinct(true);
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };

        org.springframework.data.domain.Page<Tutor> tutorPage = tutorRepository.findAll(spec, pageable);

        List<TutorDTO> content = tutorPage.getContent().stream()
                .map(this::toDTO)
                .toList();

        return com.tutorias.tutorias_backend.dto.TutoresPaginadosDTO.builder()
                .content(content)
                .totalPages(tutorPage.getTotalPages())
                .totalElements(tutorPage.getTotalElements())
                .currentPage(tutorPage.getNumber())
                .size(tutorPage.getSize())
                .build();
    }

    /**
     * Mapeador de Tutor entidad a TutorDTO.
     */
    @Transactional
    public void actualizarDisponibilidad(Long tutorId, boolean estado) {
        Tutor t = tutorRepository.findById(tutorId).orElseThrow();
        t.setEstaDisponible(estado);
        tutorRepository.save(t);
    }

    /**
     * Convierte una entidad Tutor a un objeto de transferencia de datos TutorDTO.
     * @param t Entidad Tutor.
     * @return TutorDTO mapeado.
     */
    public TutorDTO toDTO(Tutor t) {
        List<MateriaDTO> materiasDTO = t.getTutorMaterias() == null ? List.of() :
                t.getTutorMaterias().stream()
                        .filter(tm -> Boolean.TRUE.equals(tm.getActivo()))
                        .map(tm -> MateriaDTO.builder()
                                .id(tm.getMateria().getId())
                                .nombre(tm.getMateria().getNombre())
                                .departamento_id(tm.getMateria().getDepartamento().getId())
                                .departamento_nombre(tm.getMateria().getDepartamento().getNombre())
                                .build())
                        .toList();

        List<InsigniaDTO> insigniasDTO = t.getInsignias() == null ? List.of() :
                t.getInsignias().stream()
                        .map(ti -> InsigniaDTO.builder()
                                .id(ti.getInsignia().getId())
                                .nombre(ti.getInsignia().getNombre())
                                .descripcion(ti.getInsignia().getDescripcion())
                                .urlIcono(ti.getInsignia().getUrlIcono())
                                .condicionTipo(ti.getInsignia().getCondicionTipo())
                                .condicionValor(ti.getInsignia().getCondicionValor())
                                .creadoEn(ti.getInsignia().getCreadoEn())
                                .build())
                        .toList();

        return TutorDTO.builder()
                .id(t.getId())
                .nombre_completo(t.getPerfil().getNombreCompleto())
                .correo(t.getPerfil().getCorreo())
                .url_avatar(t.getPerfil().getUrlAvatar())
                .biografia(t.getBiografia())
                .frase_personal(t.getFrasePersonal())
                .precio_por_hora(t.getPrecioPorHora())
                .calificacion_promedio(t.getCalificacionPromedio())
                .total_sesiones(t.getTotalSesiones())
                .anios_experiencia(t.getAniosExperiencia())
                .duracion_sesion_min(t.getDuracionSesionMin())
                .esta_disponible(t.getEstaDisponible())
                .titulos(t.getTitulos())
                .logros(t.getLogros())
                .materias(materiasDTO)
                .insignias(insigniasDTO)
                .build();
    }
}
