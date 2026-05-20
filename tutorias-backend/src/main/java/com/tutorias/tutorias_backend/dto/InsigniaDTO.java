package com.tutorias.tutorias_backend.dto;

import com.tutorias.tutorias_backend.enums.TipoCondicionInsignia;
import lombok.*;
import java.time.OffsetDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsigniaDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String urlIcono;
    private TipoCondicionInsignia condicionTipo;
    private Integer condicionValor;
    private OffsetDateTime creadoEn;
}
