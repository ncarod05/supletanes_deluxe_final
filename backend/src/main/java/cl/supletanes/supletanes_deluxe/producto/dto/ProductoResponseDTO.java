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

    // Campos de Nombre (Para mostrar en la tabla)
    @Schema(description = "Nombre de la Marca")
    private String marcaNombre; 
    
    @Schema(description = "Nombre de la Categoría")
    private String categoriaNombre;

    // Campos de ID (CLAVE para la edición en el frontend)
    @Schema(description = "ID de la Marca asociada")
    private Long marcaId;
    
    @Schema(description = "ID de la Categoría asociada")
    private Long categoriaId;
}