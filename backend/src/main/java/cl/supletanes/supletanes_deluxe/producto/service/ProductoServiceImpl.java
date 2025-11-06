package cl.supletanes.supletanes_deluxe.producto.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import cl.supletanes.supletanes_deluxe.categoria.model.Categoria;
import cl.supletanes.supletanes_deluxe.categoria.repository.CategoriaRepository;
import cl.supletanes.supletanes_deluxe.exception.InvalidDataException;
import cl.supletanes.supletanes_deluxe.exception.ResourceNotFoundException;
import cl.supletanes.supletanes_deluxe.marca.model.Marca;
import cl.supletanes.supletanes_deluxe.marca.repository.MarcaRepository;
import cl.supletanes.supletanes_deluxe.producto.dto.ProductoRequestDTO;
import cl.supletanes.supletanes_deluxe.producto.dto.ProductoResponseDTO;
import cl.supletanes.supletanes_deluxe.producto.model.Producto;
import cl.supletanes.supletanes_deluxe.producto.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    // mapear de Entidad a DTO de Respuesta
    private ProductoResponseDTO mapToResponseDTO(Producto producto) {
        ProductoResponseDTO responseDTO = new ProductoResponseDTO();

        responseDTO.setId(producto.getId());
        responseDTO.setNombre(producto.getNombre());
        responseDTO.setPrecio(producto.getPrecio());
        responseDTO.setStock(producto.getStock());
        responseDTO.setEstado(producto.getEstado());

        // Desnormalización: Incluimos los nombres para el cliente
        if (producto.getMarca() != null) {
            responseDTO.setMarcaNombre(producto.getMarca().getNombre());
        }
        if (producto.getCategoria() != null) {
            responseDTO.setCategoriaNombre(producto.getCategoria().getNombre());
        }

        return responseDTO;
    }

    @Override
    public List<ProductoResponseDTO> getAllProductos() {
        return productoRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductoResponseDTO> getAllProductosActivos() {
        return productoRepository.findByEstadoTrue().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductoResponseDTO getProductoById(@PathVariable Long id) {
        return productoRepository.findById(id)
                .map(this::mapToResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + id));
    }

    // El método saveProducto ahora recibe el DTO de petición
    // y devuelve el DTO de respuesta.
    @Override
    public ProductoResponseDTO saveProducto(ProductoRequestDTO productoRequestDTO) {
        // 1. Buscar y Validar las Entidades Relacionadas
        Marca marca = marcaRepository.findById(productoRequestDTO.getMarcaId())
                .orElseThrow(() -> new InvalidDataException(
                        "Marca no encontrada con ID: " + productoRequestDTO.getMarcaId()));

        Categoria categoria = categoriaRepository.findById(productoRequestDTO.getCategoriaId())
                .orElseThrow(() -> new InvalidDataException(
                        "Categoría no encontrada con ID: " + productoRequestDTO.getCategoriaId()));

        // 2. Mapear DTO a Entidad (Creación del Producto)
        Producto producto = new Producto();

        producto.setNombre(productoRequestDTO.getNombre());
        producto.setPrecio(productoRequestDTO.getPrecio());
        producto.setStock(productoRequestDTO.getStock());

        // Asignación de estado, con lógica de negocio simple:
        producto.setEstado(Objects.requireNonNullElse(productoRequestDTO.getEstado(), true));

        // Asignación de las Entidades JPA completas
        producto.setMarca(marca);
        producto.setCategoria(categoria);

        // 3. Guardar en la Base de Datos
        Producto productoGuardado = productoRepository.save(producto);

        // 4. Mapear Entidad Guardada a DTO de Respuesta
        return mapToResponseDTO(productoGuardado);
    }

    @Override
    public ProductoResponseDTO updateProducto(Long id,
            ProductoRequestDTO productoRequestDTO) {
        // 1. Buscar el Producto existente
        Producto productoExistente = productoRepository.findById(id)
                .orElseThrow(() -> new InvalidDataException(
                        "Producto no encontrado con ID: " + id));

        // 2. Actualizar las Entidades Relacionadas (Marca y Categoría)

        // Si el ID de Marca viene en el DTO, buscamos y actualizamos la relación
        if (productoRequestDTO.getMarcaId() != null) {
            Marca nuevaMarca = marcaRepository.findById(productoRequestDTO.getMarcaId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Marca no encontrada con ID: " + productoRequestDTO.getMarcaId()));
            productoExistente.setMarca(nuevaMarca);
        }

        // Si el ID de Categoría viene en el DTO, buscamos y actualizamos la relación
        if (productoRequestDTO.getCategoriaId() != null) {
            Categoria nuevaCategoria = categoriaRepository.findById(productoRequestDTO.getCategoriaId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Categoría no encontrada con ID: " + productoRequestDTO.getCategoriaId()));
            productoExistente.setCategoria(nuevaCategoria);
        }

        // 3. Actualizar los Campos Simples

        // Verificaciones para que solo se actualicen si se proveen en el DTO
        if (productoRequestDTO.getNombre() != null) {
            productoExistente.setNombre(productoRequestDTO.getNombre());
        }
        if (productoRequestDTO.getPrecio() != null) {
            productoExistente.setPrecio(productoRequestDTO.getPrecio());
        }
        if (productoRequestDTO.getStock() != null) {
            productoExistente.setStock(productoRequestDTO.getStock());
        }
        if (productoRequestDTO.getEstado() != null) {
            productoExistente.setEstado(productoRequestDTO.getEstado());
        }

        // 4. Guardar la Entidad Actualizada
        Producto productoActualizado = productoRepository.save(productoExistente);

        // 5. Mapear a DTO de Respuesta
        return mapToResponseDTO(productoActualizado);
    }

    @Override
    public void deleteProducto(Long id) {
        // 1. Buscar el producto
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado."));

        // 2. Establecer el estado como inactivo (eliminación lógica)
        producto.setEstado(false);

        // 3. Guardar el producto actualizado
        productoRepository.save(producto);
    }
}
