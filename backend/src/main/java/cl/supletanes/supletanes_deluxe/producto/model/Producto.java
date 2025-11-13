package cl.supletanes.supletanes_deluxe.producto.model;

import cl.supletanes.supletanes_deluxe.categoria.model.Categoria;
import cl.supletanes.supletanes_deluxe.marca.model.Marca;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "producto")
@Schema(description = "Detalles de un producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "producto_seq")
    @SequenceGenerator(name = "producto_seq", sequenceName = "PRODUCTO_SEQ", allocationSize = 1)
    @Schema(description = "Identificador único del producto", example = "1")
    private Long id;

    @Column(nullable = false, length = 255)
    @Schema(description = "Nombre del suplemento", example = "Proteína Whey Premium", required = true)
    private String nombre;

    @Column(nullable = false)
    @Schema(description = "Precio unitario del suplemento", example = "9990.0", required = true)
    private Double precio;

    @Column(nullable = false)
    @Schema(description = "Cantidad de unidades en stock", example = "150", required = true)
    private Integer stock;

    @Column(nullable = false, columnDefinition = "NUMBER(1) DEFAULT 1")
    @Schema(description = "Estado del producto (activo/inactivo)", example = "true")
    private Boolean estado = true;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "marca_id", nullable = false)
    @Schema(description = "Marca asociada al producto")
    private Marca marca;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoria_id", nullable = false)
    @Schema(description = "Categoría asociada al producto")
    private Categoria categoria;
}
