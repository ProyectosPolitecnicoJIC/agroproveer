package com.agroproveer.usuarios.models;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    @Column(nullable = false, unique = true)
    private String correo;

    @Column(nullable = false)
    private String contrasena;

    @Column(nullable = false)
    private String telefono;

    @Column(nullable = false)
    private String documento;

    @Column(name = "tipo_documento")
    private String tipoDocumento;

    @Column(nullable = false)
    private String direccion;

    @Column(nullable = false)
    private String municipio;

    @Column(nullable = false)
    private String rol;
}
