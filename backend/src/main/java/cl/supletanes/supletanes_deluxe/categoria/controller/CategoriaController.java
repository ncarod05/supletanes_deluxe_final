package cl.supletanes.supletanes_deluxe.categoria.controller;

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

import cl.supletanes.supletanes_deluxe.categoria.dto.CategoriaRequestDTO;
import cl.supletanes.supletanes_deluxe.categoria.dto.CategoriaResponseDTO;
import cl.supletanes.supletanes_deluxe.categoria.service.CategoriaService;
import cl.supletanes.supletanes_deluxe.dto.ErrorDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:3000") // Permite la conexión desde React
@Tag(name = "Gestión de Categorías", description = "Endpoints para el CRUD de categorías")
public class CategoriaController {
        @Autowired
        private CategoriaService categoriaService;

        @Operation(summary = "Obtener todas las categorias", description = "...")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Lista de categorias recuperada exitosamente", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = CategoriaResponseDTO.class))))
        })
        @GetMapping
        public ResponseEntity<List<CategoriaResponseDTO>> getAllCategorias() {
                List<CategoriaResponseDTO> categorias = categoriaService.getAllCategorias();
                return ResponseEntity.ok(categorias);
        }

        @Operation(summary = "Listar las categorias activas", description = "Recupera una lista solamente con las categorias en estado ACTIVO")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Lista de categorias activas recuperada exitosamente", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = CategoriaResponseDTO.class))))
        })
        @GetMapping("/activas")
        public ResponseEntity<List<CategoriaResponseDTO>> getAllCategoriasActivas() {
                return ResponseEntity.ok(categoriaService.getAllCategoriasActivas());
        }

        @Operation(summary = "Obtener una categoria por ID", description = "Recupera los detalles de una categoria específica usando su ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Categoría encontrada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CategoriaResponseDTO.class))),
                        @ApiResponse(responseCode = "404", description = "Categoría no encontrada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)))
        })
        @GetMapping("/{id}")
        public ResponseEntity<CategoriaResponseDTO> getCategoriaById(
                        @Parameter(description = "ID de la categoria a buscar", required = true, example = "1") @PathVariable Long id) {
                CategoriaResponseDTO categoria = categoriaService.getCategoriaById(id);
                return ResponseEntity.ok(categoria);
        }

        @Operation(summary = "Crear una nueva categoria", description = "Agrega una nueva categoria a la base de datos.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Categoria creada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CategoriaResponseDTO.class))),
                        @ApiResponse(responseCode = "400", description = "Solicitud inválida, verificar errores"),
                        @ApiResponse(responseCode = "401", description = "No autenticado. Se requiere token JWT valido.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class))),
                        @ApiResponse(responseCode = "403", description = "Acceso Denegado. Se requiere rol de Administrador.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)))
        })
        @PostMapping
        public ResponseEntity<CategoriaResponseDTO> createCategoria(
                        @Parameter(description = "Objeto Categoria a crear", required = true) @RequestBody CategoriaRequestDTO categoriaRequestDTO) {
                CategoriaResponseDTO nuevaCategoria = categoriaService.saveCategoria(categoriaRequestDTO);
                return new ResponseEntity<>(nuevaCategoria, HttpStatus.CREATED);
        }

        @Operation(summary = "Actualizar una categoria existente", description = "Modifica los detalles de una categoria por su ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Categoria actualizada exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CategoriaResponseDTO.class))),
                        @ApiResponse(responseCode = "404", description = "Categoria no encontrada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class))),
                        @ApiResponse(responseCode = "400", description = "Solicitud inválida"),
                        @ApiResponse(responseCode = "401", description = "No autenticado. Se requiere token JWT valido.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class))),
                        @ApiResponse(responseCode = "403", description = "Acceso Denegado. Se requiere rol de Administrador.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)))
        })
        @PutMapping("/{id}")
        public ResponseEntity<CategoriaResponseDTO> updateCategoria(
                        @Parameter(description = "ID de la categoria a actualizar", required = true, example = "1") @PathVariable Long id,
                        @Parameter(description = "Objeto Categoria con los nuevos datos", required = true) @RequestBody CategoriaRequestDTO categoriaRequestDTO) {
                CategoriaResponseDTO categoriaActualizado = categoriaService.updateCategoria(id, categoriaRequestDTO);
                return ResponseEntity.ok(categoriaActualizado);
        }

        @Operation(summary = "Eliminar una categoria (lógica)", description = "Cambia el estado de una categoria a inactivo por su ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Categoria desactivada exitosamente"),
                        @ApiResponse(responseCode = "404", description = "Categoria no encontrada", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)))
        })
        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteCategoria(
                        @Parameter(description = "ID de la categoria a desactivar", required = true, example = "1") @PathVariable Long id) {
                categoriaService.deleteCategoria(id);
                return ResponseEntity.ok("Categoria desactivada correctamente");
        }
}
