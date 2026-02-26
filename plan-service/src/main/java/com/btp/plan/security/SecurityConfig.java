package com.btp.plan.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/api-docs/**").permitAll()
                        .requestMatchers("/actuator/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/plans").hasAnyRole("PROJETEUR", "EMETTEUR", "ADMIN", "CHEF_PROJET")
                        .requestMatchers(HttpMethod.POST, "/api/plans/*/versions").hasAnyRole("PROJETEUR", "EMETTEUR", "ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/plans/*/emettre").hasAnyRole("EMETTEUR", "PROJETEUR", "ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/plans/*/soumettre").hasAnyRole("PROJETEUR", "EMETTEUR", "ADMIN")
                        // Upload PDF (authentifié) + téléchargement public
                        .requestMatchers(HttpMethod.POST, "/api/plans/upload").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/plans/files/**").permitAll()
                        // Endpoint interne appelé par controle-service (pas de token JWT)
                        .requestMatchers(HttpMethod.POST, "/api/plans/*/statut").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
