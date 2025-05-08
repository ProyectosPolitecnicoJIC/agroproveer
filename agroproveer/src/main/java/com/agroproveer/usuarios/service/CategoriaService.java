package com.agroproveer.usuarios.service;

import com.agroproveer.usuarios.models.Categoria;
import com.agroproveer.usuarios.models.VentaProducto;
import com.agroproveer.usuarios.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;


    public Categoria create(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Categoria update(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }


    public List<Categoria> getAllCategoria() {
        return categoriaRepository.findAll();
    }

    public boolean existsById(Long id) {
        return categoriaRepository.existsById(id);
    }

    public void deleteById(Long id) {
        categoriaRepository.deleteById(id);
    }

    public Optional<Categoria> findById(Long id) {
        return categoriaRepository.findById(id);
    }

    public Optional<Categoria> findByNombre(String nombre) {
        return categoriaRepository.findByNombre(nombre);
    }

    public boolean existsByNombre(String nombre) {
        return categoriaRepository.existsByNombre(nombre);

    }
}
