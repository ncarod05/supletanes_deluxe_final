package cl.supletanes.supletanes_deluxe.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import cl.supletanes.supletanes_deluxe.dto.ErrorDetails;

@ControllerAdvice // Indica que esta clase manejará excepciones de forma global
public class GlobalExceptionHandler {
    // Maneja ResourceNotFoundException (404 personalizado) para GET, PUT, DELETE.
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleResourceNotFoundException(
            ResourceNotFoundException ex, WebRequest request) {

        // El mensaje de la excepción (ej: "Producto no encontrado con id: 1")
        String message = ex.getMessage();

        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                message,
                request.getDescription(false), // URI de la petición
                HttpStatus.NOT_FOUND.value());

        // Retorna el DTO de error con el código 404
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    /**
     * Maneja la InvalidDataException (400 Bad Request)
     * para fallos de IDs inexistentes en POST/PUT o datos mal formados.
     */
    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<ErrorDetails> handleInvalidDataException(
            InvalidDataException ex, WebRequest request) {

        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                ex.getMessage(), // Muestra el mensaje específico de la validación
                request.getDescription(false),
                HttpStatus.BAD_REQUEST.value() // Devuelve 400
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    /**
     * Maneja la excepción genérica (la última línea de defensa).
     * Si la excepción no fue capturada por 404, 400, ni ninguna otra,
     * asumimos que es un error inesperado del servidor (ej. fallo de SQL, NPE no
     * manejada).
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorDetails> handleRuntimeException(RuntimeException ex, WebRequest request) {
        // Registra el error completo en la consola/log para depuración
        // logger.error("Internal Server Error:", ex);

        // Devolvemos una respuesta de error 500 estandarizada
        ErrorDetails errorDetails = new ErrorDetails(
                LocalDateTime.now(),
                // Mensaje genérico para el cliente; el detalle se guarda en logs
                "Error interno del servidor.",
                request.getDescription(false),
                HttpStatus.INTERNAL_SERVER_ERROR.value());

        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
