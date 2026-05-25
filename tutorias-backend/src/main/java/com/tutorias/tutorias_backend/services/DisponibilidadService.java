package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.dto.DisponibilidadDTO;
import com.tutorias.tutorias_backend.dto.DispoEspecificaDTO; // 👈 Asegúrate de importar tu nuevo DTO
import com.tutorias.tutorias_backend.entities.Disponibilidad;
import com.tutorias.tutorias_backend.entities.DispoEspecifica; // 👈 Asegúrate de importar tu nueva Entidad
import com.tutorias.tutorias_backend.entities.Tutor;
import com.tutorias.tutorias_backend.repositories.DisponibilidadRepository;
import com.tutorias.tutorias_backend.repositories.DispoEspecificaRepository; // 👈 Asegúrate de importar tu nuevo Repositorio
import com.tutorias.tutorias_backend.repositories.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DisponibilidadService {

    @Autowired
    private DisponibilidadRepository disponibilidadRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired // 👈 Inyección de tu nuevo repositorio específico
    private DispoEspecificaRepository dispoEspecificaRepository;

    @Transactional(readOnly = true)
    public List<DisponibilidadDTO> getDisponibilidadByTutor(Long tutorId) {
        return disponibilidadRepository.findByTutorId(tutorId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public DisponibilidadDTO createDisponibilidad(DisponibilidadDTO dto) {
        Tutor tutor = tutorRepository.findById(dto.getTutorId())
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));

        Disponibilidad disponibilidad = new Disponibilidad();
        disponibilidad.setTutor(tutor);
        disponibilidad.setDiaSemana(dto.getDiaSemana());
        disponibilidad.setHoraInicio(dto.getHoraInicio());
        disponibilidad.setHoraFin(dto.getHoraFin());
        disponibilidad.setEstaActivo(dto.getEstaActivo() != null ? dto.getEstaActivo() : true);

        disponibilidad = disponibilidadRepository.save(disponibilidad);
        return toDTO(disponibilidad);
    }

    @Transactional
    public void deleteDisponibilidad(Long id) {
        disponibilidadRepository.deleteById(id);
    }

    /**
     * Crea un registro de disponibilidad excepcional/específica asignada a una
     * fecha puntual.
     */
    @Transactional
    // Recibe el DTO con los datos y el correo extraído del JWT por seguridad
    public void createDisponibilidadEspecifica(DispoEspecificaDTO dto, String correo) {
        // 1. Buscamos al tutor por el id provisto en la petición
        Tutor tutor = tutorRepository.findById(dto.getTutorId())
                .orElseThrow(() -> new RuntimeException("Tutor no encontrado"));

        // 2. Control de seguridad: Validamos que el correo del token pertenezca al
        // tutor que intenta agendar
        if (!tutor.getPerfil().getCorreo().equals(correo)) {
            throw new org.springframework.security.access.AccessDeniedException(
                    "No tienes permiso para modificar la agenda de este tutor");
        }

        // 3. Validación lógica de horas
        if (dto.getHoraInicio().isAfter(dto.getHoraFin()) || dto.getHoraInicio().equals(dto.getHoraFin())) {
            throw new IllegalArgumentException("La hora de inicio debe ser estrictamente menor que la hora de fin");
        }

        // 4. Mapeo a Entidad
        DispoEspecifica dispoEsp = new DispoEspecifica();
        dispoEsp.setTutor(tutor);
        dispoEsp.setFecha(dto.getFecha());
        dispoEsp.setHoraInicio(dto.getHoraInicio());
        dispoEsp.setHoraFin(dto.getHoraFin());
        dispoEsp.setEstaDisponible(dto.isEstaDisponible());

        // 5. Persistencia en base de datos
        dispoEspecificaRepository.save(dispoEsp);
    }

    @Transactional
    public void deleteDispoEspecifica(Long id) {
        // Validamos si existe antes de borrar para evitar inconsistencias
        if (!dispoEspecificaRepository.existsById(id)) {
            throw new RuntimeException("Disponibilidad específica no encontrada");
        }
        dispoEspecificaRepository.deleteById(id);
    }

    private DisponibilidadDTO toDTO(Disponibilidad entity) {
        DisponibilidadDTO dto = new DisponibilidadDTO();
        dto.setId(entity.getId());
        dto.setTutorId(entity.getTutor().getId());
        dto.setDiaSemana(entity.getDiaSemana());
        dto.setHoraInicio(entity.getHoraInicio());
        dto.setHoraFin(entity.getHoraFin());
        dto.setEstaActivo(entity.getEstaActivo());
        return dto;
    }

    @Transactional(readOnly = true)
    public List<com.tutorias.tutorias_backend.dto.DispoEspecificaDTO> getEspecificasByTutor(Long tutorId) {
        List<com.tutorias.tutorias_backend.entities.DispoEspecifica> listaEntidades = dispoEspecificaRepository
                .findByTutorId(tutorId);

        // Mapeamos usando el nuevo constructor del DTO
        return listaEntidades.stream().map(dispo -> new com.tutorias.tutorias_backend.dto.DispoEspecificaDTO(
                dispo.getId(),
                dispo.getTutor().getId(),
                dispo.getFecha(),
                dispo.getHoraInicio(),
                dispo.getHoraFin(),
                dispo.isEstaDisponible())).collect(java.util.stream.Collectors.toList());
    }
}