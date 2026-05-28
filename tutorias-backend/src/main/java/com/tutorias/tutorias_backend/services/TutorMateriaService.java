package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.TutorMateriaDTO;
import com.tutorias.tutorias_backend.entities.TutorMateria;
import com.tutorias.tutorias_backend.entities.TutorMateriaId;
import com.tutorias.tutorias_backend.enums.EstadoSesion;
import com.tutorias.tutorias_backend.enums.EstadoPago;
import com.tutorias.tutorias_backend.repositories.TutorMateriaRepository;
import com.tutorias.tutorias_backend.repositories.SesionTutoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TutorMateriaService {

    private final TutorMateriaRepository tutorMateriaRepository;
    private final SesionTutoriaRepository sesionTutoriaRepository;

    public List<TutorMateriaDTO> getTutorMaterias(Long tutorId) {
        List<TutorMateria> tms = tutorMateriaRepository.findByTutorId(tutorId);
        OffsetDateTime now = OffsetDateTime.now();
        OffsetDateTime startOfMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0).withNano(0);

        return tms.stream().map(tm -> {
            Long materiaId = tm.getMateria().getId();
            
            // 1. Sesiones dictadas este mes (completada)
            Long dictadas = sesionTutoriaRepository.countByTutorIdAndMateriaIdAndEstadoAndProgramadaParaAfter(
                    tutorId, materiaId, EstadoSesion.completada, startOfMonth);

            // 2. Sesiones pendientes este mes (programada, en_progreso)
            Long pendientes = sesionTutoriaRepository.countByTutorIdAndMateriaIdAndEstadoInAndProgramadaParaAfter(
                    tutorId, materiaId, List.of(EstadoSesion.programada, EstadoSesion.en_progreso), startOfMonth);

            // 3. Progreso
            double total = dictadas + pendientes;
            double progreso = total > 0 ? (dictadas * 100.0 / total) : 0.0;

            // 4. Próxima sesión (Pagada)
            OffsetDateTime proxima = sesionTutoriaRepository.findNextPaidSession(
                    tutorId, materiaId, EstadoPago.completado, now, PageRequest.of(0, 1))
                    .stream()
                    .findFirst()
                    .map(s -> s.getProgramadaPara())
                    .orElse(null);

            return TutorMateriaDTO.builder()
                    .materiaId(materiaId)
                    .nombre(tm.getMateria().getNombre())
                    .departamento(tm.getMateria().getDepartamento().getNombre())
                    .activo(tm.getActivo())
                    .progreso(progreso)
                    .proximaSesion(proxima)
                    .sesionesDictadas(dictadas)
                    .sesionesPendientes(pendientes)
                    .build();
        }).collect(Collectors.toList());
    }

    @Transactional
    public void toggleStatus(Long tutorId, Long materiaId) {
        TutorMateria tm = tutorMateriaRepository.findById(new TutorMateriaId(tutorId, materiaId))
                .orElseThrow(() -> new RuntimeException("Materia no asignada al tutor"));
        tm.setActivo(!tm.getActivo());
        tutorMateriaRepository.save(tm);
    }

    @Transactional
    public void deleteMateria(Long tutorId, Long materiaId) {
        // Verificar si hay sesiones programadas o en progreso
        Long activeSessions = sesionTutoriaRepository.countByTutorIdAndMateriaIdAndEstadoIn(
                tutorId, materiaId, List.of(EstadoSesion.programada, EstadoSesion.en_progreso));

        if (activeSessions > 0) {
            throw new RuntimeException("No puedes darte de baja de esta materia porque tienes sesiones programadas o en curso.");
        }

        tutorMateriaRepository.deleteById(new TutorMateriaId(tutorId, materiaId));
    }
}
