package com.agroproveer.usuarios.rest;


import com.agroproveer.usuarios.models.Categoria;
import com.agroproveer.usuarios.models.VentaProducto;
import com.agroproveer.usuarios.service.CategoriaService;
import com.agroproveer.usuarios.service.VentaProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/categoria")
public class CategoriaRest {
    @Autowired
    CategoriaService categoriaService;

    @GetMapping(value = "")
    private ResponseEntity<List<Categoria>> listAllCategorias() {
        return ResponseEntity.ok(categoriaService.getAllCategoria());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoria(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaService.findById(id);

        if (categoria == null || categoria.isEmpty()) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No esta registrada : " + id);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        return ResponseEntity.ok(categoria);
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<?> getCategoria(@PathVariable String nombre) {
        Optional<Categoria> categoria = categoriaService.findByNombre(nombre);

        if (categoria == null || categoria.isEmpty()) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No esta registrada la cateogira : " + nombre);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        return ResponseEntity.ok(categoria);
    }

    @PostMapping(value = "/save")
    private ResponseEntity<?> save(@RequestBody Categoria categoria) {
        try {
            if (!categoriaService.existsByNombre(categoria.getNombre())) {
                Categoria temp = categoriaService.create(categoria);
                return ResponseEntity.ok(temp);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "La categoria " + categoria.getNombre() + " ya esta registrada.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al registrar la categoria.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Boolean> eliminarCategoriaById(@PathVariable Long id) {
        if (categoriaService.existsById(id)) {
            categoriaService.deleteById(id);
            return ResponseEntity.ok(categoriaService.findById(id)!=null);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/actualizar")
    private ResponseEntity<?> actualizarProducto(@RequestBody Categoria categoria) {
        try {
            if (categoriaService.existsById(categoria.getId())) {
                Categoria temp = categoriaService.update(categoria);
                return ResponseEntity.ok(temp);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "La categoria " + categoria.getNombre() + " no está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al actualizar la categoria.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}