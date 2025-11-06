package cl.supletanes.supletanes_deluxe.marca.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "DTO de respuesta para Marca")
public class MarcaResponseDTO {
    private Long id;
    private String nombre;
    private Boolean estado;
}