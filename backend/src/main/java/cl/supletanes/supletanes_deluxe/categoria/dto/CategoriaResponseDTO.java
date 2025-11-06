package cl.supletanes.supletanes_deluxe.categoria.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "DTO de respuesta para Categoria")
public class CategoriaResponseDTO {
    private Long id;
    private String nombre;
    private Boolean estado;
}
