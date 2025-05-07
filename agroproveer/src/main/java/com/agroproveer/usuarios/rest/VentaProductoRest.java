package com.agroproveer.usuarios.rest;

import com.agroproveer.usuarios.models.Usuario;
import com.agroproveer.usuarios.models.VentaProducto;
import com.agroproveer.usuarios.service.UsuarioService;
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
@RequestMapping("/api/ventaProducto")

public class VentaProductoRest {



    @Autowired
    VentaProductoService ventaProductoService;

    @GetMapping(value = "")
    private ResponseEntity<List<VentaProducto>> listAllVentaProductos() {
        return ResponseEntity.ok(ventaProductoService.getAllVentaProducto());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVentaProducto(@PathVariable Long id) {
        Optional<VentaProducto> ventaProducto = ventaProductoService.findById(id);

        if (ventaProducto == null || ventaProducto.isEmpty()) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No se registro : " + id);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        return ResponseEntity.ok(ventaProducto);
    }

    @PostMapping(value = "/save")
    private ResponseEntity<?> save(@RequestBody VentaProducto ventaProducto) {
        try {
            if (!ventaProductoService.existsById(Long.valueOf(ventaProducto.getId()))) {
                VentaProducto temp = ventaProductoService.create(ventaProducto);
//                webSocketService.sendPropietarioUpdate(temp);
                return ResponseEntity.ok(temp);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "el producto producto " + ventaProducto.getId() + " ya está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al registrar el producto.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Boolean> eliminarProductoById(@PathVariable Long id) {
        if (ventaProductoService.existsById(id)) {
            ventaProductoService.deleteById(id);
            return ResponseEntity.ok(ventaProductoService.findById(id)!=null);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/actualizar")
    private ResponseEntity<?> actualizarProducto(@RequestBody VentaProducto ventaProducto) {
        try {
            if (ventaProductoService.existsById(Long.valueOf(ventaProducto.getId()))) {
                VentaProducto temp = ventaProductoService.update(ventaProducto);
//                webSocketService.sendPropietarioUpdate(temp);
                return ResponseEntity.ok(temp);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El producto " + ventaProducto.getId() + " no está registrado.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Ocurrió un error al actualizar el productp.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
