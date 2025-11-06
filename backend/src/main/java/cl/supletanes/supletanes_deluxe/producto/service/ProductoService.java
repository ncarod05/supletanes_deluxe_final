package cl.supletanes.supletanes_deluxe.producto.service;

import java.util.List;

import cl.supletanes.supletanes_deluxe.producto.dto.ProductoRequestDTO;
import cl.supletanes.supletanes_deluxe.producto.dto.ProductoResponseDTO;

public interface ProductoService {
    ProductoResponseDTO saveProducto(ProductoRequestDTO productoRequestDTO);
    List<ProductoResponseDTO> getAllProductos();
    List<ProductoResponseDTO> getAllProductosActivos();
    ProductoResponseDTO getProductoById(Long id);
    ProductoResponseDTO updateProducto(Long id, ProductoRequestDTO productoRequestDTO);
    void deleteProducto(Long id);
}
