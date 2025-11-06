package cl.supletanes.supletanes_deluxe.marca.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import cl.supletanes.supletanes_deluxe.exception.ResourceNotFoundException;
import cl.supletanes.supletanes_deluxe.marca.dto.MarcaRequestDTO;
import cl.supletanes.supletanes_deluxe.marca.dto.MarcaResponseDTO;
import cl.supletanes.supletanes_deluxe.marca.model.Marca;
import cl.supletanes.supletanes_deluxe.marca.repository.MarcaRepository;

@Service
public class MarcaServiceImpl implements MarcaService {
    @Autowired
    private MarcaRepository marcaRepository;

    // mapear de Entidad a DTO de Respuesta
    private MarcaResponseDTO mapToResponseDTO(Marca marca) {
        MarcaResponseDTO responseDTO = new MarcaResponseDTO();

        responseDTO.setId(marca.getId());
        responseDTO.setNombre(marca.getNombre());
        responseDTO.setEstado(marca.getEstado());

        return responseDTO;
    }

    @Override
    public List<MarcaResponseDTO> getAllMarcas() {
        return marcaRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MarcaResponseDTO> getAllMarcasActivas() {
        return marcaRepository.findByEstadoTrue().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MarcaResponseDTO getMarcaById(@PathVariable Long id) {
        return marcaRepository.findById(id)
                .map(this::mapToResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Marca no encontrada con id: " + id));
    }

    @Override
    public MarcaResponseDTO saveMarca(MarcaRequestDTO marcaRequestDTO) {
        Marca marca = new Marca();

        marca.setNombre(marcaRequestDTO.getNombre());

        // Asignación de estado, con lógica de negocio simple:
        marca.setEstado(Objects.requireNonNullElse(marcaRequestDTO.getEstado(), true));

        Marca marcaGuardado = marcaRepository.save(marca);

        return mapToResponseDTO(marcaGuardado);
    }

    @Override
    public MarcaResponseDTO updateMarca(Long id, MarcaRequestDTO marcaRequestDTO) {
        Marca marcaExistente = marcaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Marca no encontrada con ID: " + id));

        // Verificaciones para que solo se actualicen si se proveen en el DTO
        if (marcaRequestDTO.getNombre() != null) {
            marcaExistente.setNombre(marcaRequestDTO.getNombre());
        }
        if (marcaRequestDTO.getEstado() != null) {
            marcaExistente.setEstado(marcaRequestDTO.getEstado());
        }

        // 4. Guardar la Entidad Actualizada
        Marca marcaActualizada = marcaRepository.save(marcaExistente);

        // 5. Mapear a DTO de Respuesta
        return mapToResponseDTO(marcaActualizada);
    }

    @Override
    public void deleteMarca(Long id) {
        Marca marca = marcaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Marca no encontrada con id: " + id));

        marca.setEstado(false);

        marcaRepository.save(marca);
    }
}
