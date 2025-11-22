package cl.supletanes.supletanes_deluxe.marca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.supletanes.supletanes_deluxe.dto.ErrorDetails;
import cl.supletanes.supletanes_deluxe.marca.dto.MarcaRequestDTO;
import cl.supletanes.supletanes_deluxe.marca.dto.MarcaResponseDTO;
import cl.supletanes.supletanes_deluxe.marca.service.MarcaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/marcas")
@CrossOrigin(origins = "http://localhost:3000") // Permite la conexión desde React
@Tag(name = "Gestión de Marcas", description = "Endpoints para el CRUD de marcas")
public class MarcaController {
        @Autowired
        private MarcaService marcaService;

        @Operation(summary = "Obtener todas las marcas", description = "Recupera una lista de todas las marcas en la base de datos")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Lista de marcas recuperada exitosamente", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MarcaResponseDTO.class))))
        })
        @GetMapping
        public ResponseEntity<List<MarcaResponseDTO>> getAllMarcas() {
                List<MarcaResponseDTO> marcas = marcaService.getAllMarcas();
                return ResponseEntity.ok(marcas);
        }

        @Operation(summary = "Listar las marcas activas", description = "Recupera una lista solamente con las marcas en estado ACTIVO")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Lista de marcas activas recuperada exitosamente", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MarcaResponseDTO.class))))
        })
        @GetMapping("/activas")
        public ResponseEntity<List<MarcaResponseDTO>> getAllMarcasActivas() {
                return ResponseEntity.ok(marcaService.getAllMarcasActivas());
        }

        @Operation(summary = "Obtener una marca por ID", description = "Recupera los detalles de una marca específica usando su ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Marca encontrada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = MarcaResponseDTO.class))),
                        @ApiResponse(responseCode = "404", description = "Marca no encontrada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)))
        })
        @GetMapping("/{id}")
        public ResponseEntity<MarcaResponseDTO> getMarcaById(
                        @Parameter(description = "ID de la marca a buscar", required = true, example = "1") @PathVariable Long id) {
                MarcaResponseDTO marca = marcaService.getMarcaById(id);
                return ResponseEntity.ok(marca);
        }

        @Operation(summary = "Crear una nueva marca", description = "Agrega una nueva marca a la base de datos.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Marca creada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = MarcaResponseDTO.class))),
                        @ApiResponse(responseCode = "400", description = "Solicitud inválida, verificar errores"),
                        @ApiResponse(responseCode = "401", description = "No autenticado. Se requiere token JWT valido.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class))),
                        @ApiResponse(responseCode = "403", description = "Acceso Denegado. Se requiere rol de Administrador.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)))
        })
        @PostMapping
        public ResponseEntity<MarcaResponseDTO> createMarca(
                        @Parameter(description = "Objeto Marca a crear", required = true) @RequestBody MarcaRequestDTO marcaRequestDTO) {
                MarcaResponseDTO nuevaMarca = marcaService.saveMarca(marcaRequestDTO);
                return new ResponseEntity<>(nuevaMarca, HttpStatus.CREATED);
        }

        @Operation(summary = "Actualizar una marca existente", description = "Modifica los detalles de una marca por su ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Marca actualizada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = MarcaResponseDTO.class))),
                        @ApiResponse(responseCode = "404", description = "Marca no encontrada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class))),
                        @ApiResponse(responseCode = "400", description = "Solicitud inválida"),
                        @ApiResponse(responseCode = "401", description = "No autenticado. Se requiere token JWT valido.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class))),
                        @ApiResponse(responseCode = "403", description = "Acceso Denegado. Se requiere rol de Administrador.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)))
        })
        @PutMapping("/{id}")
        public ResponseEntity<MarcaResponseDTO> updateMarca(
                        @Parameter(description = "ID de la marca a actualizar", required = true, example = "1") @PathVariable Long id,
                        @Parameter(description = "Objeto Marca con los nuevos datos", required = true) @RequestBody MarcaRequestDTO marcaRequestDTO) {
                MarcaResponseDTO marcaActualizado = marcaService.updateMarca(id, marcaRequestDTO);
                return ResponseEntity.ok(marcaActualizado);
        }

        @Operation(summary = "Eliminar una marca (lógica)", description = "Cambia el estado de una marca a inactivo por su ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Marca desactivada exitosamente"),
                        @ApiResponse(responseCode = "404", description = "Marca no encontrada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)))
        })
        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteMarca(
                        @Parameter(description = "ID de la marca a desactivar", required = true, example = "1") @PathVariable Long id) {
                marcaService.deleteMarca(id);
                return ResponseEntity.ok("Marca desactivada correctamente");
        }
}
