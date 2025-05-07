package com.agroproveer.usuarios.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "venta_producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VentaProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "venta_id")
    private Venta venta;

    @ManyToOne(optional = false)
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(name = "precio_unitario", nullable = false)
    private Double precioUnitario;
}

