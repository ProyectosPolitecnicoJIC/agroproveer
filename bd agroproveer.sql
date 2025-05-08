CREATE DATABASE agroproveer;

CREATE TABLE usuario (
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    documento VARCHAR(20) PRIMARY KEY,
    tipo_documento VARCHAR(20),
    direccion VARCHAR(255),
    departamento VARCHAR(100) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    rol VARCHAR(20) NOT NULL DEFAULT 'VENDEDOR'
);

-- Tabla de categorías de productos
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT
);

-- Tabla de productos
CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    imagen_url TEXT,
    municipio VARCHAR(100) NOT NULL,
    cantidad_disponible INTEGER NOT NULL DEFAULT 0,
    vendedor_id VARCHAR NOT NULL REFERENCES usuario(documento) ON DELETE CASCADE,
    categoria_id INTEGER NOT NULL REFERENCES categoria(id) ON DELETE CASCADE
);

CREATE TABLE venta (
    id SERIAL PRIMARY KEY,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nombre_completo VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    direccion_envio VARCHAR(255) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    documento VARCHAR(20),
    tipo_documento VARCHAR(20),
    total_pagar DECIMAL(10, 2) NOT NULL,
    nota TEXT
);


-- Detalle de productos vendidos en una venta
CREATE TABLE venta_producto (
    id SERIAL PRIMARY KEY,
    venta_id INTEGER NOT NULL REFERENCES venta(id) ON DELETE CASCADE,
    producto_id INTEGER NOT NULL REFERENCES producto(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10, 2) NOT NULL
);


INSERT INTO usuario (nombre, apellido, correo, contrasena, telefono, documento, tipo_documento, direccion, departamento, municipio, rol)
VALUES 
('Juan', 'Pérez', 'juan.perez@example.com', 'hashedpassword1', '3001234567', '1001', 'CC', 'Calle 1 #10-20', 'Cundinamarca', 'Bogotá', 'VENDEDOR'),
('María', 'López', 'maria.lopez@example.com', 'hashedpassword2', '3002345678', '1002', 'CC', 'Calle 2 #20-30', 'Antioquia', 'Medellín', 'VENDEDOR'),
('Carlos', 'Ramírez', 'carlos.ramirez@example.com', 'hashedpassword3', '3003456789', '1003', 'CC', 'Calle 3 #30-40', 'Valle', 'Cali', 'VENDEDOR'),
('Ana', 'Gómez', 'ana.gomez@example.com', 'hashedpassword4', '3004567890', '2001', 'CC', 'Carrera 45 #15-23', 'Cundinamarca', 'Bogotá', 'COMPRADOR'),
('Luis', 'Martínez', 'luis.martinez@example.com', 'hashedpassword5', '3005678901', '2002', 'CC', 'Carrera 12 #45-67', 'Antioquia', 'Medellín', 'COMPRADOR');

INSERT INTO categoria (nombre, descripcion)
VALUES 
('Frutas', 'Frutas frescas y locales'),
('Verduras', 'Verduras orgánicas'),
('Lácteos', 'Productos lácteos artesanales'),
('Granos', 'Granos y cereales'),
('Carnes', 'Carne fresca de campo');


INSERT INTO producto (nombre, descripcion, precio, imagen_url, municipio, cantidad_disponible, vendedor_id, categoria_id)
VALUES 
('Manzanas', 'Manzanas rojas dulces', 3000.00, 'https://example.com/manzanas.jpg', 'Bogotá', 50, '1001', 1),
('Lechuga', 'Lechuga fresca y orgánica', 1500.00, 'https://example.com/lechuga.jpg', 'Medellín', 100, '1002', 2),
('Queso campesino', 'Queso fresco artesanal', 12000.00, 'https://example.com/queso.jpg', 'Cali', 20, '1003', 3),
('Arroz', 'Arroz blanco premium', 2500.00, 'https://example.com/arroz.jpg', 'Bogotá', 200, '1001', 4),
('Pollo campesino', 'Pollo fresco de granja', 15000.00, 'https://example.com/pollo.jpg', 'Medellín', 30, '1002', 5);


INSERT INTO venta (nombre_completo, correo, direccion_envio, metodo_pago, telefono, documento, tipo_documento, total_pagar, nota)
VALUES 
('Ana Gómez', 'ana.gomez@example.com', 'Carrera 45 #15-23', 'Tarjeta de crédito', '3004567890', '2001', 'CC', 4500.00, 'Por favor, entregar entre 3-5pm'),
('Luis Martínez', 'luis.martinez@example.com', 'Carrera 12 #45-67', 'Efectivo', '3005678901', '2002', 'CC', 3000.00, 'Entregar en portería');


-- Venta 1: Ana compra 1 lechuga y 1 arroz
INSERT INTO venta_producto (venta_id, producto_id, cantidad, precio_unitario)
VALUES 
(1, 2, 1, 1500.00),  -- Lechuga
(1, 4, 1, 2500.00);  -- Arroz

-- Venta 2: Luis compra 1 kg de manzanas
INSERT INTO venta_producto (venta_id, producto_id, cantidad, precio_unitario)
VALUES 
(2, 1, 1, 3000.00);  -- Manzanas





