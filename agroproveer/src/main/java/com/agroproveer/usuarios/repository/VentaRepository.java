package com.agroproveer.usuarios.repository;

import com.agroproveer.usuarios.models.Venta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VentaRepository  extends JpaRepository<Venta,String> {
}
