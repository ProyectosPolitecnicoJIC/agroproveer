package com.agroproveer.usuarios.service;

import com.agroproveer.usuarios.models.Producto;
import com.agroproveer.usuarios.models.Usuario;
import com.agroproveer.usuarios.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {


    @Autowired
    private ProductoRepository productoRepository;


    public Producto create(Producto producto) {
        return productoRepository.save(producto);
    }

    public Producto update(Producto producto) {
        return productoRepository.save(producto);
    }

    public List<Producto> getProductosByVendedor(String vendedor) {
        return productoRepository.findByVendedor(vendedor);
    }

    public List<Producto> getAllProducto() {
        return productoRepository.findAll();
    }

    public Optional<Producto> findById(Long id) {
        return productoRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return productoRepository.existsById(id);
    }

    public void deleteById(Long id) {
        productoRepository.deleteById(id);
    }

    public boolean existsByNombre(String nombre) {
        return productoRepository.existsByNombre(nombre);

    }

    public boolean existsByNombreAndVendedor(String nombre, String vendedor) {
        return productoRepository.existsByNombreAndVendedor(nombre, vendedor);

    }
}
