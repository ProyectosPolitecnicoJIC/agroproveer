package com.agroproveer.usuarios.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "carrito_producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarritoProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carrito_id", nullable = false)
    private Carrito carrito;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    @Column(nullable = false)
    private Integer cantidad;
}
