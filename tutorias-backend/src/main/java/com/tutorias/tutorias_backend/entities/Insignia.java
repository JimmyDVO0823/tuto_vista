package com.tutorias.tutorias_backend.entities;

import com.tutorias.tutorias_backend.enums.TipoCondicionInsignia;
import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "insignia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Insignia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "url_icono")
    private String urlIcono;

    @Enumerated(EnumType.STRING)
    @Column(name = "condicion_tipo", nullable = false)
    private TipoCondicionInsignia condicionTipo;

    @Column(name = "condicion_valor", nullable = false)
    private Integer condicionValor;

    @Column(name = "creado_en", nullable = false, updatable = false)
    @Builder.Default
    private OffsetDateTime creadoEn = OffsetDateTime.now();
}
