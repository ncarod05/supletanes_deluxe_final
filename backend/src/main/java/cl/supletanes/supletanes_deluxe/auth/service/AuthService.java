package cl.supletanes.supletanes_deluxe.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cl.supletanes.supletanes_deluxe.auth.dto.AuthResponse;
import cl.supletanes.supletanes_deluxe.auth.dto.LoginRequest;
import cl.supletanes.supletanes_deluxe.auth.dto.RegisterRequest;
import cl.supletanes.supletanes_deluxe.auth.model.Role;
import cl.supletanes.supletanes_deluxe.auth.model.Usuario;
import cl.supletanes.supletanes_deluxe.auth.repository.UsuarioRepository;
import cl.supletanes.supletanes_deluxe.security.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthResponse register(RegisterRequest request) {
        if (usuarioRepository.existsByUsername(request.getUsername())) {
            return AuthResponse.builder()
                    .message("El nombre de usuario ya existe")
                    .build();
        }
        
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            return AuthResponse.builder()
                    .message("El email ya está registrado")
                    .build();
        }
        
        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setRole(Role.USER);
        usuario.setActivo(true);
        
        usuarioRepository.save(usuario);
        
        String token = jwtService.generateToken(usuario);
        
        return AuthResponse.builder()
                .token(token)
                .username(usuario.getUsername())
                .role(usuario.getRole().name())
                .message("Usuario registrado exitosamente")
                .build();
    }
    
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        
        Usuario usuario = usuarioRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        String token = jwtService.generateToken(usuario);
        
        return AuthResponse.builder()
                .token(token)
                .username(usuario.getUsername())
                .role(usuario.getRole().name())
                .message("Login exitoso")
                .build();
    }
}