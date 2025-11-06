package cl.supletanes.supletanes_deluxe.categoria.service;

import java.util.List;

import cl.supletanes.supletanes_deluxe.categoria.dto.CategoriaRequestDTO;
import cl.supletanes.supletanes_deluxe.categoria.dto.CategoriaResponseDTO;

public interface CategoriaService {
    CategoriaResponseDTO saveCategoria(CategoriaRequestDTO categoriaRequestDTO);
    List<CategoriaResponseDTO> getAllCategorias();
    List<CategoriaResponseDTO> getAllCategoriasActivas();
    CategoriaResponseDTO getCategoriaById(Long id);
    CategoriaResponseDTO updateCategoria(Long id, CategoriaRequestDTO categoriaRequestDTO);
    void deleteCategoria(Long id);
}
