CREATE DATABASE bdagroproveer;

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    documento VARCHAR(20) NOT NULL,
    tipo_documento VARCHAR(20),
    direccion VARCHAR(255),
    municipio VARCHAR(100) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'VENDEDOR'
);


CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT
);


CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    imagen_url TEXT,
    municipio VARCHAR(100) NOT NULL,
    vendedor_id INTEGER NOT NULL REFERENCES vendedor(id) ON DELETE CASCADE,
    categoria_id INTEGER NOT NULL REFERENCES categoria(id)
);

CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE carrito_producto (
    id SERIAL PRIMARY KEY,
    carrito_id INTEGER NOT NULL REFERENCES carrito(id) ON DELETE CASCADE,
    producto_id INTEGER NOT NULL REFERENCES producto(id),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0)
);

CREATE TABLE venta (
    id SERIAL PRIMARY KEY,
    carrito_id INTEGER REFERENCES carrito(id),
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    nombre_completo VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    direccion_envio VARCHAR(255) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    documento VARCHAR(20),
    tipo_documento VARCHAR(20),
    nota TEXT
);
