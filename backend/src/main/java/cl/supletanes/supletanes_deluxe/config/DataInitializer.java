package cl.supletanes.supletanes_deluxe.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import cl.supletanes.supletanes_deluxe.auth.model.Role;
import cl.supletanes.supletanes_deluxe.auth.model.Usuario;
import cl.supletanes.supletanes_deluxe.auth.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        if (!usuarioRepository.existsByUsername("admin")) {
            Usuario admin = new Usuario();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setNombre("Administrador");
            admin.setEmail("admin@suplementos.com");
            admin.setRole(Role.ADMIN);
            admin.setActivo(true);
            
            usuarioRepository.save(admin);
            System.out.println("Usuario admin creado: username=admin, password=admin123");
        }
    }
}