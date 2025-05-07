package com.agroproveer.usuarios.service;

import com.agroproveer.usuarios.models.Categoria;
import com.agroproveer.usuarios.models.Producto;
import com.agroproveer.usuarios.repository.CategoriaRepository;
import com.agroproveer.usuarios.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public boolean existsById(String id) {
        return categoriaRepository.existsById(id);
    }

    public void deleteById(String id) {
        categoriaRepository.deleteById(id);
    }
}
