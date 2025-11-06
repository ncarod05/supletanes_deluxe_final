package cl.supletanes.supletanes_deluxe.categoria.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "categoria")
@Schema(description = "Representa una categoría o tipo de suplemento")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categoria_seq")
    @SequenceGenerator(name = "categoria_seq", sequenceName = "CATEGORIA_SEQ", allocationSize = 1)
    @Schema(description = "Identificador único de la categoría", example = "1")
    private Long id;

    @Column(nullable = false, length = 100)
    @Schema(description = "Nombre de la categoría", example = "Proteínas", required = true)
    private String nombre;

    @Column(nullable = false, columnDefinition = "NUMBER(1) DEFAULT 1")
    @Schema(description = "Indica si la categoría está activa o inactiva", example = "true")
    private Boolean estado = true;
}