package com.agroproveer.usuarios.rest;

import com.agroproveer.usuarios.models.Producto;
import com.agroproveer.usuarios.service.ProductoService;
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
@RequestMapping("/api/producto")
public class ProductoRest {

    @Autowired
    ProductoService productoService;

    @Autowired
    UsuarioService usuarioService;

    @GetMapping(value = "")
    private ResponseEntity<List<Producto>> listAllProducto() {
        return ResponseEntity.ok(productoService.getAllProducto());
    }

    @GetMapping(value = "/vendedor/{vendedor}")
    private ResponseEntity<List<Producto>> listAllProductoByVendedor(@PathVariable String vendedor) {
        return ResponseEntity.ok(productoService.getProductosByVendedor(vendedor));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProducto(@PathVariable Long id) {
        Optional<Producto> productos = productoService.findById(id);

        if (productos == null || productos.isEmpty()) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No se encuentra registrado el producto : " + id);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        return ResponseEntity.ok(productos);
    }

    @PostMapping(value = "/save")
    private ResponseEntity<?> save(@RequestBody Producto producto) {
        try {
            if (!productoService.existsByNombreAndVendedor(producto.getNombre(),producto.getVendedor())) {
                Producto temp = productoService.create(producto);
//                webSocketService.sendPropietarioUpdate(temp);
                return ResponseEntity.ok(temp);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El producto " + producto.getNombre() + " ya está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al guardar el producto.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Boolean> eliminarProductoById(@PathVariable Long id) {
        if (productoService.existsById(id)) {
            productoService.deleteById(id);
            return ResponseEntity.ok(productoService.findById(id) != null);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/actualizar")
    private ResponseEntity<?> actualizarProducto(@RequestBody Producto producto) {
        try {
            if (productoService.existsById(producto.getId())) {
                Producto temp = productoService.update(producto);
//                webSocketService.sendPropietarioUpdate(temp);
                return ResponseEntity.ok(temp);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El producto " + producto.getNombre() + " no está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al actualizar el producto.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

}
