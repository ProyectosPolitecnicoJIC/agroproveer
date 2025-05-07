package com.agroproveer.usuarios.service;

import com.agroproveer.usuarios.models.Venta;
import com.agroproveer.usuarios.models.VentaProducto;
import com.agroproveer.usuarios.repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VentaService {


    @Autowired
    private VentaRepository ventaRepository;


    public Venta create(Venta venta) {
        return ventaRepository.save(venta);
    }

    public Venta update(Venta venta) {
        return ventaRepository.save(venta);
    }


    public List<Venta> getAllVenta() {
        return ventaRepository.findAll();
    }

    public boolean existsById(String id) {
        return ventaRepository.existsById(id);
    }

    public void deleteById(String id) {
        ventaRepository.deleteById(id);
    }

    public Optional<Venta> findById(String id) {
        return ventaRepository.findById(id);
    }
}
