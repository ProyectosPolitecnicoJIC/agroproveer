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


INSERT INTO usuario (nombre, apellido, correo, contrasena, telefono, documento, tipo_documento, direccion, departamento, municipio, rol) VALUES 
('Carlos', 'Pérez', 'carlos.perez@agro.com', '123456', '3001234567', '100200300', 'CC', 'Calle 10 #20-30', 'Antioquia', 'Medellín', 'VENDEDOR'),
('Laura', 'Gómez', 'laura.gomez@agro.com', 'abcdef', '3012345678', '200300400', 'CC', 'Carrera 50 #15-20', 'Antioquia', 'Envigado', 'VENDEDOR'),
('Marta', 'López', 'marta.lopez@agro.com', 'pass1234', '3023456789', '300400500', 'CC', 'Calle 30 #10-15', 'Antioquia', 'Bello', 'VENDEDOR'),
('Juan', 'Torres', 'juan.torres@agro.com', 'adminpass', '3111112222', '400500600', 'CC', 'Avenida 70 #40-60', 'Antioquia', 'Itagüí', 'ADMIN');


INSERT INTO categoria (nombre, descripcion) VALUES
('Tubérculos', 'Productos como papa, yuca y similares'),
('Verduras', 'Verduras frescas como zanahoria, lechuga, etc.'),
('Cereales', 'Arroz, maíz, trigo y otros cereales'),
('Frutas', 'Frutas frescas de la región');

INSERT INTO producto (nombre, descripcion, precio, imagen_url, municipio, vendedor_id, categoria_id) VALUES
('Papa Criolla', 'Papa criolla fresca cultivada en Antioquia.', 2500.00, 'https://ejemplo.com/papa.jpg', 'Medellín', 400500600, 1),
('Zanahoria', 'Zanahoria orgánica de alta calidad.', 1800.00, 'https://ejemplo.com/zanahoria.jpg', 'Envigado', 300400500, 2),
('Arroz Integral', 'Arroz integral 100% natural.', 4000.00, 'https://ejemplo.com/arroz.jpg', 'Bello', 100200300, 3),
('Mango Tommy', 'Mangos Tommy jugosos y dulces.', 3500.00, 'https://ejemplo.com/mango.jpg', 'Itagüí', 100200300, 4);


INSERT INTO venta (
    nombre_completo, correo, direccion_envio, metodo_pago, telefono, documento, tipo_documento, total_pagar, nota
) VALUES
(
    'Juan Carlos Martínez',
    'juan.martinez@correo.com',
    'Calle 50 #20-30, Medellín',
    'Efectivo',
    '3005556666',
    '1122334455',
    'CC',
    9800.00,
    'Por favor entregar en la mañana.'
);

INSERT INTO venta_producto (venta_id, producto_id, cantidad, precio_unitario) VALUES
(1, 1, 2, 2500.00),  -- 2 papas criollas
(1, 2, 1, 1800.00),  -- 1 zanahoria
(1, 3, 1, 4000.00);  -- 1 arroz integral





