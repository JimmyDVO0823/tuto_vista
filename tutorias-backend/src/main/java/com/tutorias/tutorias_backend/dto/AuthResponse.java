package com.tutorias.tutorias_backend.dto;

import com.tutorias.tutorias_backend.enums.Rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO que representa la respuesta de una autenticación exitosa.
 * Contiene el token JWT generado y la información básica del perfil del usuario.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long id;
    private String correo;
    private String nombreCompleto;
    private String urlAvatar;
    private Rol rol;
}
