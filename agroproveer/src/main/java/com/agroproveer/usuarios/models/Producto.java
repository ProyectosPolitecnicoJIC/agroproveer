package com.agroproveer.usuarios.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(nullable = false)
    private String municipio;

    @Column(name = "vendedor_id", nullable = false)
    private String vendedor;

    @Column(name = "categoria_id", nullable = false)
    private Long categoria;

    @Column(name = "cantidad_disponible",nullable = false)
    private Integer cantidadDisponible;
}
