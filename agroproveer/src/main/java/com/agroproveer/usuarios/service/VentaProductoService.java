package com.agroproveer.usuarios.service;

import com.agroproveer.usuarios.models.VentaProducto;
import com.agroproveer.usuarios.repository.VentaProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VentaProductoService {


    @Autowired
    private VentaProductoRepository ventaProductoRepository;


    public VentaProducto create(VentaProducto ventaProducto) {
        return ventaProductoRepository.save(ventaProducto);
    }

    public VentaProducto update(VentaProducto ventaProducto) {
        return ventaProductoRepository.save(ventaProducto);
    }


    public List<VentaProducto> getAllVentaProducto() {
        return ventaProductoRepository.findAll();
    }

    public boolean existsById(Long id) {
        return ventaProductoRepository.existsById(id);
    }

    public void deleteById(Long id) {
        ventaProductoRepository.deleteById(id);
    }

    public Optional<VentaProducto> findById(Long id) {
        return ventaProductoRepository.findById(id);
    }
}
