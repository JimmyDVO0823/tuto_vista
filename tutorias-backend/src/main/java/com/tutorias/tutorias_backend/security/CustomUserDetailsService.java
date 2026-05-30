package com.tutorias.tutorias_backend.security;

import com.tutorias.tutorias_backend.entities.Perfil;
import com.tutorias.tutorias_backend.repositories.PerfilRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Implementación personalizada de UserDetailsService de Spring Security.
 * Carga los detalles del usuario desde la base de datos utilizando el repositorio de perfiles.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final PerfilRepository perfilRepository;

    /**
     * Carga un usuario por su nombre de usuario (en este caso, el correo electrónico).
     *
     * @param email Correo electrónico del usuario.
     * @return UserDetails con la información de autenticación del usuario.
     * @throws UsernameNotFoundException si no se encuentra el perfil con el correo dado.
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Perfil perfil = perfilRepository.findByCorreo(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el correo: " + email));

        return new User(
                perfil.getCorreo(),
                perfil.getContrasenaHash(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + perfil.getRol().name().toUpperCase()))
        );
    }
}
