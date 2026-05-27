package com.tutorias.tutorias_backend.services;

import com.tutorias.tutorias_backend.entities.Configuracion;
import com.tutorias.tutorias_backend.repositories.ConfiguracionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ConfiguracionService {

    private final ConfiguracionRepository configuracionRepository;

    private static final String CLAVE_COMISION = "comision_plataforma";
    private static final String COMISION_POR_DEFECTO = "0.10";

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
