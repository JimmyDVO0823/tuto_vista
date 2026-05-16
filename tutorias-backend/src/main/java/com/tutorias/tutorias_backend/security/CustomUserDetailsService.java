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

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final PerfilRepository perfilRepository;

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
