package cl.supletanes.supletanes_deluxe.auth.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String nombre;
    private String email;
}