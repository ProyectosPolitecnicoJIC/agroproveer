package com.agroproveer.usuarios.dtos;

import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VentaProductoRequest {
    private Long productoId;
    private Integer cantidad;
    private BigDecimal precioUnitario;

    public VentaProductoRequest(String nombre, Integer cantidad, BigDecimal precioUnitario) {
    }
}

