package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.ReporteDTO;
import com.tutorias.tutorias_backend.entities.Perfil;
import com.tutorias.tutorias_backend.entities.Reporte;
import com.tutorias.tutorias_backend.entities.SesionTutoria;
import com.tutorias.tutorias_backend.repositories.PerfilRepository;
import com.tutorias.tutorias_backend.repositories.ReporteRepository;
import com.tutorias.tutorias_backend.repositories.SesionTutoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReporteService {

    private final ReporteRepository reporteRepository;
    private final PerfilRepository perfilRepository;
    private final SesionTutoriaRepository sesionRepository;

    public List<ReporteDTO> findAll() {
        return reporteRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ReporteDTO create(ReporteDTO dto) {
        Perfil reportadoPor = perfilRepository.findById(dto.getReportadoPorId())
                .orElseThrow(() -> new RuntimeException("Perfil no encontrado"));
        Perfil reportadoA = perfilRepository.findById(dto.getReportadoAId())
                .orElseThrow(() -> new RuntimeException("Perfil no encontrado"));
        SesionTutoria sesion = dto.getSesionId() != null ? sesionRepository.findById(dto.getSesionId()).orElse(null) : null;

        Reporte reporte = Reporte.builder()
                .reportadoPor(reportadoPor)
                .reportadoA(reportadoA)
                .sesion(sesion)
                .motivo(dto.getMotivo())
                .descripcion(dto.getDescripcion())
                .estado(dto.getEstado())
                .build();

        return mapToDTO(reporteRepository.save(reporte));
    }

    private ReporteDTO mapToDTO(Reporte entity) {
        return ReporteDTO.builder()
                .id(entity.getId())
                .reportadoPorId(entity.getReportadoPor().getId())
                .reportadoAId(entity.getReportadoA().getId())
                .sesionId(entity.getSesion() != null ? entity.getSesion().getId() : null)
                .motivo(entity.getMotivo())
                .descripcion(entity.getDescripcion())
                .estado(entity.getEstado())
                .creadoEn(entity.getCreadoEn())
                .build();
    }
}
