package com.agroproveer.usuarios.repository;

import com.agroproveer.usuarios.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository  extends JpaRepository<Usuario,String> {
}
