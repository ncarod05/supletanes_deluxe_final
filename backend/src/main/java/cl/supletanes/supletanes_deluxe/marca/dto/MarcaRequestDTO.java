package cl.supletanes.supletanes_deluxe.marca.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "DTO de petición para crear o actualizar Marca")
public class MarcaRequestDTO { 
    @NotBlank(message = "El nombre de la marca no puede estar vacío")
    private String nombre;
    
    private Boolean estado;
}