package cl.supletanes.supletanes_deluxe.producto.controller;

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
import cl.supletanes.supletanes_deluxe.producto.dto.ProductoRequestDTO;
import cl.supletanes.supletanes_deluxe.producto.dto.ProductoResponseDTO;
import cl.supletanes.supletanes_deluxe.producto.model.Producto;
import cl.supletanes.supletanes_deluxe.producto.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:3000") // Permite la conexión desde React
@Tag(name = "Gestión de Productos", description = "Endpoints para el CRUD de productos")
public class ProductoController {
        @Autowired
        private ProductoService productoService;

        @Operation(summary = "Obtener todos los productos (incluye inactivos)", description = "Recupera una lista de todos los productos en la base de datos")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Lista de productos recuperada exitosamente", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ProductoResponseDTO.class))))
        })
        @GetMapping
        public ResponseEntity<List<ProductoResponseDTO>> getAllProductos() {
                List<ProductoResponseDTO> productos = productoService.getAllProductos();
                return ResponseEntity.ok(productos); // Respuesta abreviada para 200 OK
        }

        @Operation(summary = "Listar los productos activos", description = "Recupera una lista solamente con los productos en estado ACTIVO")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Lista de productos activos recuperada exitosamente", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ProductoResponseDTO.class))))
        })
        @GetMapping("/activos")
        public ResponseEntity<List<ProductoResponseDTO>> getAllProductosActivos() {
                return ResponseEntity.ok(productoService.getAllProductosActivos());
        }

        @Operation(summary = "Obtener un producto por ID", description = "Recupera los detalles de un producto específico usando su ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Producto encontrado exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ProductoResponseDTO.class))),
                        @ApiResponse(responseCode = "404", description = "Recurso no encontrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)))
        })
        @GetMapping("/{id}")
        public ResponseEntity<ProductoResponseDTO> getProductoById(
                        @Parameter(description = "ID del producto a buscar", required = true, example = "1") @PathVariable Long id) {
                ProductoResponseDTO producto = productoService.getProductoById(id);
                return ResponseEntity.ok(producto);
        }

        @Operation(summary = "Crear un nuevo producto", description = "Agrega un nuevo producto a la base de datos.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Producto creado exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class))),
                        @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class))),
                        @ApiResponse(responseCode = "401", description = "No autenticado. Se requiere token JWT valido.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class))),
                        @ApiResponse(responseCode = "403", description = "Acceso Denegado. Se requiere rol de Administrador.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)))
        })
        @PostMapping
        public ResponseEntity<ProductoResponseDTO> createProducto(
                        @Parameter(description = "Objeto Producto a crear", required = true) @RequestBody ProductoRequestDTO productoRequestDTO) {
                ProductoResponseDTO nuevoProducto = productoService.saveProducto(productoRequestDTO);
                // Retorna el producto creado con el código de estado 201 CREATED.
                return new ResponseEntity<>(nuevoProducto, HttpStatus.CREATED);
        }

        @Operation(summary = "Actualizar un producto existente", description = "Modifica los detalles de un producto por su ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Producto actualizado exitosamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Producto.class))),
                        @ApiResponse(responseCode = "404", description = "Producto no encontrado"),
                        @ApiResponse(responseCode = "400", description = "Solicitud inválida"),
                        @ApiResponse(responseCode = "401", description = "No autenticado. Se requiere token JWT valido.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class))),
                        @ApiResponse(responseCode = "403", description = "Acceso Denegado. Se requiere rol de Administrador.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorDetails.class)))
        })
        @PutMapping("/{id}")
        public ResponseEntity<ProductoResponseDTO> updateProducto(
                        @Parameter(description = "ID del producto a actualizar", required = true, example = "1") @PathVariable Long id,
                        @Parameter(description = "Objeto Producto con los nuevos datos", required = true) @RequestBody ProductoRequestDTO productoRequestDTO) {
                ProductoResponseDTO productoActualizado = productoService.updateProducto(id, productoRequestDTO);
                return ResponseEntity.ok(productoActualizado);
        }

        @Operation(summary = "Eliminar un producto (lógica)", description = "Cambia el estado de un producto a inactivo por su ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Producto desactivado exitosamente"),
                        @ApiResponse(responseCode = "404", description = "Producto no encontrado")
        })
        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteProducto(
                        @Parameter(description = "ID del producto a desactivar", required = true, example = "1") @PathVariable Long id) {
                productoService.deleteProducto(id);
                return ResponseEntity.ok("Suplemento desactivado correctamente");
        }
}
