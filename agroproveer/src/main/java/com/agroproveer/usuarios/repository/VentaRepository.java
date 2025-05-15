package com.agroproveer.usuarios.repository;

import com.agroproveer.usuarios.models.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VentaRepository  extends JpaRepository<Venta,Long> {

    List<Venta> findByDocumento(String documento);

}
