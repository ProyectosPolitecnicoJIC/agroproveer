package com.agroproveer.usuarios.repository;

import com.agroproveer.usuarios.models.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository  extends JpaRepository<Categoria,String> {
}
