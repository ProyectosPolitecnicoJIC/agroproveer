package com.agroproveer.usuarios.repository;

import com.agroproveer.usuarios.models.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriaRepository  extends JpaRepository<Categoria,Long> {

    boolean existsByNombre(String nombre);

    Optional<Categoria> findByNombre(String nombre);
}
