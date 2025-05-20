package com.agroproveer.usuarios.repository;

import com.agroproveer.usuarios.models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    boolean existsByNombre(String nombre);

    boolean existsByNombreAndVendedor(String nombre, String vendedor);

    List<Producto> findByVendedor(String vendedor);
}
