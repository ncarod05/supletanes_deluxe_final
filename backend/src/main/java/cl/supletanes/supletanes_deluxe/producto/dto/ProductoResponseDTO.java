package cl.supletanes.supletanes_deluxe.producto.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "DTO para devolver un Producto al cliente")
public class ProductoResponseDTO {
    private Long id;
    private String nombre;
    private Double precio;
    private Integer stock;
    private Boolean estado;

    // Devolvemos el nombre de la marca y categoría (desnormalizado para el cliente)
    @Schema(description = "Nombre de la Marca")
    private String marcaNombre; 
    
    @Schema(description = "Nombre de la Categoría")
    private String categoriaNombre;
}