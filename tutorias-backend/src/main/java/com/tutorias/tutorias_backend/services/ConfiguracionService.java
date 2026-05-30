package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.entities.Configuracion;
import com.tutorias.tutorias_backend.repositories.ConfiguracionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

/**
 * Servicio para la gestión de la configuración persistente del sistema.
 * Actualmente maneja configuraciones como la comisión de la plataforma.
 */
@Service
@RequiredArgsConstructor
public class ConfiguracionService {

    private final ConfiguracionRepository configuracionRepository;

    private static final String CLAVE_COMISION = "comision_plataforma";
    private static final String COMISION_POR_DEFECTO = "0.10";

    /**
     * Obtiene el valor de la comisión actual del sistema.
     * Si no se encuentra configurado, retorna un valor por defecto.
     *
     * @return El valor de la comisión como BigDecimal.
     */
    @Transactional(readOnly = true)
    public BigDecimal obtenerComision() {
        return configuracionRepository.findByClave(CLAVE_COMISION)
                .map(config -> {
                    try {
                        return new BigDecimal(config.getValor());
                    } catch (NumberFormatException e) {
                        return new BigDecimal(COMISION_POR_DEFECTO);
                    }
                })
                .orElse(new BigDecimal(COMISION_POR_DEFECTO));
    }

    /**
     * Guarda un nuevo valor para la comisión de la plataforma.
     *
     * @param nuevaComision Nuevo valor de la comisión (entre 0.00 y 1.00).
     * @throws IllegalArgumentException si la comisión no está en el rango permitido.
     */
    @Transactional
    public void guardarComision(BigDecimal nuevaComision) {
        if (nuevaComision.compareTo(BigDecimal.ZERO) < 0 || nuevaComision.compareTo(BigDecimal.ONE) > 0) {
            throw new IllegalArgumentException("La comisión debe estar entre 0.00 y 1.00 (0% y 100%)");
        }

        Configuracion config = configuracionRepository.findByClave(CLAVE_COMISION)
                .orElseGet(() -> Configuracion.builder()
                        .clave(CLAVE_COMISION)
                        .build());
        
        config.setValor(nuevaComision.toString());
        configuracionRepository.save(config);
    }
}
