package cl.supletanes.supletanes_deluxe.categoria.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "DTO de petición para crear o actualizar Categoria")
public class CategoriaRequestDTO { 
    @NotBlank(message = "El nombre de la categoría no puede estar vacío")
    private String nombre;
    
    private Boolean estado;
}