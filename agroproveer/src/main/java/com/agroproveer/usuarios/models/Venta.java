package com.agroproveer.usuarios.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "venta")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class  Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carrito_id")
    private Carrito carrito;

    @Column(name = "fecha_venta")
    private LocalDateTime fechaVenta = LocalDateTime.now();

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    @Column(nullable = false)
    private String correo;

    @Column(name = "direccion_envio", nullable = false)
    private String direccionEnvio;

    @Column(name = "metodo_pago", nullable = false)
    private String metodoPago;

    private String telefono;

    private String documento;

    @Column(name = "tipo_documento")
    private String tipoDocumento;

    @Column(columnDefinition = "TEXT")
    private String nota;
}
