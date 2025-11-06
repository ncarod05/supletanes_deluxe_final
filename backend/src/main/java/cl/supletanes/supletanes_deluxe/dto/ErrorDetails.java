package cl.supletanes.supletanes_deluxe.dto;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Detalles estandarizados para respuestas de error de la API")
public class ErrorDetails {
    
    @Schema(description = "Marca de tiempo de la ocurrencia del error")
    private LocalDateTime timestamp;
    
    @Schema(description = "Mensaje de error descriptivo (el mensaje de la excepción)")
    private String message;
    
    @Schema(description = "Detalles de la URL que causó el error")
    private String details;
    
    @Schema(description = "Código de estado HTTP")
    private int status;

    public ErrorDetails(LocalDateTime timestamp, String message, String details, int status) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
        this.status = status;
    }
}
