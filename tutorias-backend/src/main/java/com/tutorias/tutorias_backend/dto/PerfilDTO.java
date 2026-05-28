package com.tutorias.tutorias_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PerfilDTO {
    private Long id;
    private String nombreCompleto;
    private String correo;
    private String urlAvatar;
    private String rol;
}
