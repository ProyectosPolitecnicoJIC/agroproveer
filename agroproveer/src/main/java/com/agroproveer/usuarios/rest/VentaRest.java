package com.agroproveer.usuarios.rest;

import com.agroproveer.usuarios.models.Venta;
import com.agroproveer.usuarios.models.VentaProducto;
import com.agroproveer.usuarios.service.VentaProductoService;
import com.agroproveer.usuarios.service.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/venta")
public class VentaRest {


        @Autowired
        VentaService ventaService;

        @GetMapping(value = "")
        private ResponseEntity<List<Venta>> listAllVenta() {
            return ResponseEntity.ok(ventaService.getAllVenta());
        }

        @GetMapping("/{id}")
        public ResponseEntity<?> getVenta(@PathVariable String id) {
            Optional<Venta> venta = ventaService.findById(id);

            if (venta == null || venta.isEmpty()) {

                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "No se registro : " + id);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            return ResponseEntity.ok(venta);
        }

        @PostMapping(value = "/save")
        private ResponseEntity<?> save(@RequestBody Venta venta) {
            try {
                if (!ventaService.existsById(venta.getId())) {
                    Venta temp = ventaService.create(venta);
//                webSocketService.sendPropietarioUpdate(temp);
                    return ResponseEntity.ok(temp);
                } else {
                    Map<String, String> errorResponse = new HashMap<>();
                    errorResponse.put("error", " " + venta.getId() + " ya está registrado.");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
                }
            } catch (Exception e) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Ocurrió un error al registrar el producto.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
            }
        }

        @DeleteMapping("/eliminar/{id}")
        public ResponseEntity<Boolean> eliminarVentaById(@PathVariable String id) {
            if (ventaService.existsById(id)) {
                ventaService.deleteById(id);
                return ResponseEntity.ok(ventaService.findById(id)!=null);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        @PostMapping(value = "/actualizar")
        private ResponseEntity<?> actualizarProducto(@RequestBody Venta venta) {
            try {
                if (ventaService.existsById(venta.getId())) {
                    Venta temp = ventaService.update(venta);
//                webSocketService.sendPropietarioUpdate(temp);
                    return ResponseEntity.ok(temp);
                } else {
                    Map<String, String> errorResponse = new HashMap<>();
                    errorResponse.put("error", " " + venta.getId() + " no está registrado.");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
                }
            } catch (Exception e) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Ocurrió un error al actualizar el registro.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
            }
        }
}
