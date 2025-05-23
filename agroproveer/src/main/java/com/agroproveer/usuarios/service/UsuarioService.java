package com.agroproveer.usuarios.service;

import com.agroproveer.usuarios.models.Producto;
import com.agroproveer.usuarios.models.Usuario;
import com.agroproveer.usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public Usuario create(Usuario usuario) {
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        return usuarioRepository.save(usuario);
    }

    public Usuario update(Usuario usuario) {
        Optional<Usuario> existingUsuario = usuarioRepository.findById(usuario.getDocumento());
    
    if (existingUsuario.isPresent()) {
        Usuario existing = existingUsuario.get();
        
        // Si la contraseña está vacía o nula, mantener la existente
        if (usuario.getContrasena() == null || usuario.getContrasena().trim().isEmpty()) {
            usuario.setContrasena(existing.getContrasena());
        } else {
            // Si se proporciona una nueva contraseña, codificarla
            usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        }
    }
    return usuarioRepository.save(usuario);
    }


    public List<Usuario> getAllUsuario() {
        return usuarioRepository.findAll();
    }

    public boolean existsById(String id) {
        return usuarioRepository.existsById(id);
    }

    public void deleteById(String id) {
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> findById(String id) {
        return usuarioRepository.findById(id);
    }
    public Usuario findByCorreo(String userName) {
        return usuarioRepository.findByCorreo(userName)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }

    public List<Usuario> findByDocumento(String documento) {
        return usuarioRepository.findByDocumento(documento);
    }
}
