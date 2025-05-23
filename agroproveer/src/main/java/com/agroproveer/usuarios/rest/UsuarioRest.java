package com.agroproveer.usuarios.rest;

import com.agroproveer.usuarios.models.Producto;
import com.agroproveer.usuarios.models.Usuario;
import com.agroproveer.usuarios.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioRest {


    @Autowired
    UsuarioService usuarioService;

    @GetMapping(value = "")
    private ResponseEntity<List<Usuario>> listAllUsuarios() {
        return ResponseEntity.ok(usuarioService.getAllUsuario());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUsuario(@PathVariable String id) {
        Optional<Usuario> usuario = usuarioService.findById(id);

        if (usuario == null || usuario.isEmpty()) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No se encuentra registrado el usuario con documento : " + id);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        return ResponseEntity.ok(usuario);
    }

    @PostMapping(value = "/save")
    private ResponseEntity<?> save(@RequestBody Usuario usuario) {
        try {
            if (!usuarioService.existsById(usuario.getDocumento())) {
                Usuario temp = usuarioService.create(usuario);
//                webSocketService.sendPropietarioUpdate(temp);
                return ResponseEntity.ok(temp);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El usuario " + usuario.getNombre() + " ya está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al registrar el usuario.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Boolean> eliminarUsuarioById(@PathVariable String id) {
        if (usuarioService.existsById(id)) {
            usuarioService.deleteById(id);
            return ResponseEntity.ok(usuarioService.findById(id)!=null);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/actualizar")
    private ResponseEntity<?> actualizarUsuario(@RequestBody Usuario usuario) {
        try {
            if (usuarioService.existsById(usuario.getDocumento())) {

                Usuario temp = usuarioService.update(usuario);
//                webSocketService.sendPropietarioUpdate(temp);
                return ResponseEntity.ok(temp);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El usuario " + usuario.getNombre() + " no está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al actualizar el usuario.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

}
