package cl.supletanes.supletanes_deluxe.marca.service;

import java.util.List;

import cl.supletanes.supletanes_deluxe.marca.dto.MarcaRequestDTO;
import cl.supletanes.supletanes_deluxe.marca.dto.MarcaResponseDTO;

public interface MarcaService {
    MarcaResponseDTO saveMarca(MarcaRequestDTO marcaRequestDTO);
    List<MarcaResponseDTO> getAllMarcas();
    List<MarcaResponseDTO> getAllMarcasActivas();
    MarcaResponseDTO getMarcaById(Long id);
    MarcaResponseDTO updateMarca(Long id, MarcaRequestDTO marcaRequestDTO);
    void deleteMarca(Long id);
}
