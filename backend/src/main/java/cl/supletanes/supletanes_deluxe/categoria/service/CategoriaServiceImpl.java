package cl.supletanes.supletanes_deluxe.categoria.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import cl.supletanes.supletanes_deluxe.categoria.dto.CategoriaRequestDTO;
import cl.supletanes.supletanes_deluxe.categoria.dto.CategoriaResponseDTO;
import cl.supletanes.supletanes_deluxe.categoria.model.Categoria;
import cl.supletanes.supletanes_deluxe.categoria.repository.CategoriaRepository;
import cl.supletanes.supletanes_deluxe.exception.ResourceNotFoundException;

@Service
public class CategoriaServiceImpl implements CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    // mapear de Entidad a DTO de Respuesta
    private CategoriaResponseDTO mapToResponseDTO(Categoria categoria) {
        CategoriaResponseDTO responseDTO = new CategoriaResponseDTO();

        responseDTO.setId(categoria.getId());
        responseDTO.setNombre(categoria.getNombre());
        responseDTO.setEstado(categoria.getEstado());

        return responseDTO;
    }

    @Override
    public List<CategoriaResponseDTO> getAllCategorias() {
        return categoriaRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CategoriaResponseDTO> getAllCategoriasActivas() {
        return categoriaRepository.findByEstadoTrue().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoriaResponseDTO getCategoriaById(@PathVariable Long id) {
        return categoriaRepository.findById(id)
                .map(this::mapToResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada con id: " + id));
    }

    @Override
    public CategoriaResponseDTO saveCategoria(CategoriaRequestDTO categoriaRequestDTO) {
        Categoria categoria = new Categoria();

        categoria.setNombre(categoriaRequestDTO.getNombre());

        // Asignación de estado, con lógica de negocio simple:
        categoria.setEstado(Objects.requireNonNullElse(categoriaRequestDTO.getEstado(), true));

        Categoria categoriaGuardado = categoriaRepository.save(categoria);

        return mapToResponseDTO(categoriaGuardado);
    }

    @Override
    public CategoriaResponseDTO updateCategoria(Long id, CategoriaRequestDTO categoriaRequestDTO) {
        Categoria categoriaExistente = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Categoria no encontrada con ID: " + id));

        // Verificaciones para que solo se actualicen si se proveen en el DTO
        if (categoriaRequestDTO.getNombre() != null) {
            categoriaExistente.setNombre(categoriaRequestDTO.getNombre());
        }
        if (categoriaRequestDTO.getEstado() != null) {
            categoriaExistente.setEstado(categoriaRequestDTO.getEstado());
        }

        // 4. Guardar la Entidad Actualizada
        Categoria categoriaActualizada = categoriaRepository.save(categoriaExistente);

        // 5. Mapear a DTO de Respuesta
        return mapToResponseDTO(categoriaActualizada);
    }

    @Override
    public void deleteCategoria(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada con id: " + id));

        categoria.setEstado(false);

        categoriaRepository.save(categoria);
    }
}
