package com.tutorias.tutorias_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import com.tutorias.tutorias_backend.security.JwtAuthenticationFilter;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(headers -> headers
                        .frameOptions(frame -> frame.disable())
                        .contentSecurityPolicy(csp -> csp
                                .policyDirectives(
                                        "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
                                        "https://sdk.mercadopago.com https://www.mercadopago.com https://secure.mlstatic.com; " +
                                        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; " +
                                        "img-src 'self' data: https://*.mlstatic.com; " +
                                        "connect-src 'self' https://api.mercadopago.com https://www.mercadopago.com.co; " +
                                        "frame-src https://*.mercadopago.com https://*.mercadopago.com.co; " +
                                        "object-src 'none'; " +
                                        "base-uri 'self'; " +
                                        "form-action 'self' https://checkout.mercadopago.com;"))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/auth/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/error")).permitAll()
                        // Endpoints públicos según backend.md regla 11
                        .requestMatchers(
                                AntPathRequestMatcher.antMatcher(org.springframework.http.HttpMethod.GET, "/tutores"))
                        .permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher(org.springframework.http.HttpMethod.GET,
                                "/tutores/**"))
                        .permitAll()
                        .requestMatchers(
                                AntPathRequestMatcher.antMatcher(org.springframework.http.HttpMethod.GET, "/materias"))
                        .permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher(org.springframework.http.HttpMethod.GET,
                                "/departamentos"))
                        .permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/v3/api-docs/**"),
                                AntPathRequestMatcher.antMatcher("/swagger-ui/**"),
                                AntPathRequestMatcher.antMatcher("/swagger-ui.html"))
                        .permitAll()
                        .anyRequest().authenticated())
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter,
                        org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public org.springframework.security.authentication.AuthenticationProvider authenticationProvider() {
        org.springframework.security.authentication.dao.DaoAuthenticationProvider authProvider = new org.springframework.security.authentication.dao.DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
