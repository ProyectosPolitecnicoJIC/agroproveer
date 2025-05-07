package com.agroproveer.usuarios.repository;

import com.agroproveer.usuarios.models.Producto;
import com.agroproveer.usuarios.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductoRepository extends JpaRepository<Producto, Long> {

    boolean existsByNombre(String nombre);

    boolean existsByNombreAndVendedor(String nombre, String vendedor);


}
