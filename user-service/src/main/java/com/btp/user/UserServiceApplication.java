package com.btp.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

/**
 * Point d'entrée du User Service.
 * Gère l'authentification JWT et le CRUD des utilisateurs.
 * Exclut l'auto-configuration UserDetailsService (gestion manuelle via JWT).
 */
@SpringBootApplication(exclude = {UserDetailsServiceAutoConfiguration.class})
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
