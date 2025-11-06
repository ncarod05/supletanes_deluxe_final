package cl.supletanes.supletanes_deluxe.marca.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.supletanes.supletanes_deluxe.marca.model.Marca;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {
    List<Marca> findByEstadoTrue();
}
