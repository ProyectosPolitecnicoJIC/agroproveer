package com.agroproveer.usuarios.repository;

import com.agroproveer.usuarios.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository  extends JpaRepository<Usuario,String> {

    List<Usuario> findByDocumento(String documento);
    Optional<Usuario> findByCorreo(String correo);
}
