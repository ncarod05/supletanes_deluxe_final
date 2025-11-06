package cl.supletanes.supletanes_deluxe.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    // Constructor que acepta el mensaje de error
    public ResourceNotFoundException(String message) {
        super(message);
    }

    // Constructor para serialización si fuera necesario
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}