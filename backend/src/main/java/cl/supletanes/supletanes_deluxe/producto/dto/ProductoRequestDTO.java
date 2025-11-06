package cl.supletanes.supletanes_deluxe.producto.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "DTO para crear o actualizar un Producto")
public class ProductoRequestDTO {  
    private String nombre;
    private Double precio;
    private Integer stock;
    private Boolean estado;

    @Schema(description = "ID de la Marca asociada", required = true)
    private Long marcaId; 

    @Schema(description = "ID de la Categoría asociada", required = true)
    private Long categoriaId;
}
