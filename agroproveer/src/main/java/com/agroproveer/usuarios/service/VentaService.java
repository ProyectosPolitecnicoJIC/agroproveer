package com.agroproveer.usuarios.service;

import com.agroproveer.usuarios.dtos.VentaRequest;
import com.agroproveer.usuarios.exception.GlobalExceptionHandler;
import com.agroproveer.usuarios.exception.StockInsuficienteException;
import com.agroproveer.usuarios.models.Venta;
import com.agroproveer.usuarios.models.VentaProducto;
import com.agroproveer.usuarios.repository.ProductoRepository;
import com.agroproveer.usuarios.repository.VentaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VentaService {


    private final VentaRepository ventaRepository;
    private final ProductoRepository productoRepository;

    @Transactional
    public Venta registrarVenta(VentaRequest request) {
        Venta venta = Venta.builder()
                .fechaVenta(LocalDateTime.now())
                .nombreCompleto(request.getNombreCompleto())
                .correo(request.getCorreo())
                .direccionEnvio(request.getDireccionEnvio())
                .metodoPago(request.getMetodoPago())
                .telefono(request.getTelefono())
                .documento(request.getDocumento())
                .tipoDocumento(request.getTipoDocumento())
                .totalPagar(request.getTotalPagar())
                .nota(request.getNota())
                .build();

        var productosVendidos = request.getProductos().stream().map(p -> {
            var producto = productoRepository.findById(p.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + p.getProductoId()));

            if (producto.getCantidadDisponible() < p.getCantidad()) {
                throw new StockInsuficienteException("Stock insuficiente para el producto: " + producto.getNombre());
            }

            producto.setCantidadDisponible(producto.getCantidadDisponible() - p.getCantidad());

            productoRepository.save(producto);

            return VentaProducto.builder()
                    .venta(venta)
                    .producto(producto)
                    .cantidad(p.getCantidad())
                    .precioUnitario(p.getPrecioUnitario())
                    .build();
        }).collect(Collectors.toList());

        venta.setProductosVendidos(productosVendidos);
        return ventaRepository.save(venta);
    }


    public Venta update(Venta venta) {
        return ventaRepository.save(venta);
    }


    public List<Venta> getAllVenta() {
        return ventaRepository.findAll();
    }

    public boolean existsById(Long id) {
        return ventaRepository.existsById(id);
    }

    public void deleteById(Long id) {
        ventaRepository.deleteById(id);
    }

    public Optional<Venta> findById(Long id) {
        return ventaRepository.findById(id);
    }

    public List<Venta> findByDocumento(String documento) {
        return ventaRepository.findByDocumento(documento);
    }
}
