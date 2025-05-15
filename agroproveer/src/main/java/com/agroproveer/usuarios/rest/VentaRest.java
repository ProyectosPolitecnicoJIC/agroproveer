package com.agroproveer.usuarios.rest;

import com.agroproveer.usuarios.dtos.VentaProductoRequest;
import com.agroproveer.usuarios.dtos.VentaRequest;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/venta")
public class VentaRest {


    @Autowired
    VentaService ventaService;

    @GetMapping(value = "")
    private ResponseEntity<List<Venta>> listAllVenta() {
        return ResponseEntity.ok(ventaService.getAllVenta());
    }

    public List<VentaRequest> getVentas() {
        List<Venta> ventas = ventaService.getAllVenta();
        return ventas.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private VentaRequest mapToDto(Venta venta) {
        return new VentaRequest(
                venta.getId(),
                venta.getNombreCompleto(),
                venta.getTotalPagar(),
                venta.getProductosVendidos().stream()
                        .map(p -> new VentaProductoRequest(p.getProducto().getNombre(), p.getCantidad(), p.getPrecioUnitario()))
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVenta(@PathVariable Long id) {
        Optional<Venta> venta = ventaService.findById(id);

        if (venta == null || venta.isEmpty()) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No se registro : " + id);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        return ResponseEntity.ok(venta);
    }


    @GetMapping("/documento/{documento}")
    public ResponseEntity<?> getVentaByDocumento(@PathVariable String documento) {
        List<Venta> venta = ventaService.findByDocumento(documento);

        if (venta == null || venta.isEmpty()) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "No se registro : " + documento);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        return ResponseEntity.ok(venta);
    }

    @PostMapping(value = "/sendVenta")
    public Venta crearVenta(@RequestBody VentaRequest request) {
        return ventaService.registrarVenta(request);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Boolean> eliminarVentaById(@PathVariable Long id) {
        if (ventaService.existsById(id)) {
            ventaService.deleteById(id);
            return ResponseEntity.ok(ventaService.findById(id) != null);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/actualizar")
    private ResponseEntity<?> actualizarProducto(@RequestBody Venta venta) {
        try {
            if (ventaService.existsById(Long.valueOf(venta.getId()))) {
                Venta temp = ventaService.update(venta);
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
