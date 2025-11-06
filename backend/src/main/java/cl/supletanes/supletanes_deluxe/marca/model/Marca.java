package cl.supletanes.supletanes_deluxe.marca.model;

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
@Table(name = "marca")
@Schema(description = "Representa la marca de un suplemento")
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "marca_seq")
    @SequenceGenerator(name = "marca_seq", sequenceName = "MARCA_SEQ", allocationSize = 1)
    @Schema(description = "Identificador único de la marca", example = "1")
    private Long id;

    @Column(nullable = false, length = 100)
    @Schema(description = "Nombre de la marca", example = "Optimum Nutrition", required = true)
    private String nombre;

    @Column(nullable = false, columnDefinition = "NUMBER(1) DEFAULT 1")
    @Schema(description = "Indica si la marca está activa o inactiva", example = "true")
    private Boolean estado = true;
}