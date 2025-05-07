package com.agroproveer.usuarios.dtos;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VentaRequest {

    private String nombreCompleto;
    private String correo;
    private String direccionEnvio;
    private String metodoPago;
    private String telefono;
    private String documento;
    private String tipoDocumento;
    private BigDecimal totalPagar;
    private String nota;

    private List<VentaProductoRequest> productos;

    public <R> VentaRequest(Long id, String nombreCompleto, BigDecimal totalPagar, R collect) {
    }
}
