-- Database: MercadoApp

-- DROP DATABASE IF EXISTS "MercadoApp";

-- CREATE DATABASE "MercadoApp"
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'Spanish_Mexico.1252'
--     LC_CTYPE = 'Spanish_Mexico.1252'
--     LOCALE_PROVIDER = 'libc'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    Id_usuario SERIAL PRIMARY KEY,
    Correo VARCHAR(100) NOT NULL UNIQUE,
    Contraseña VARCHAR(255) NOT NULL,
	Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100),
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('Admin', 'Gerente', 'Cliente')),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Clientes (rol = cliente)
CREATE TABLE Clientes (
    Id_usuario INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100),
    Telefono VARCHAR(20),
    Fecha_nacimiento DATE,
    FOREIGN KEY (Id_usuario) REFERENCES Usuarios(Id_usuario)
);

-- Tabla Productos
CREATE TABLE Productos (
    Id_producto SERIAL PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Nombre_artista VARCHAR(100),
    Descripcion TEXT,
    Precio DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL,
    Calificacion FLOAT DEFAULT 0,
    Fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Estimado_dia_entrega INT
);

-- Tabla ImagenesProducto
CREATE TABLE ImagenesProducto (
    Id_imagen SERIAL PRIMARY KEY,
    Id_producto INT,
    Url_imagen VARCHAR(255),
    FOREIGN KEY (Id_producto) REFERENCES Productos(Id_producto)
);

-- Tabla Favoritos (productos guardados)
CREATE TABLE Favoritos (
    Id_usuario INT,
    Id_producto INT,
    Fecha_guardado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Id_usuario, Id_producto),
    FOREIGN KEY (Id_usuario) REFERENCES Usuarios(Id_usuario),
    FOREIGN KEY (Id_producto) REFERENCES Productos(Id_producto)
);

-- Tabla Carrito (productos que se quieren comprar)
CREATE TABLE Carrito (
    Id_usuario INT,
    Id_producto INT,
    Cantidad INT NOT NULL,
    PRIMARY KEY (Id_usuario, Id_producto),
    FOREIGN KEY (Id_usuario) REFERENCES Usuarios(Id_usuario),
    FOREIGN KEY (Id_producto) REFERENCES Productos(Id_producto)
);

-- Tabla Ventas
CREATE TABLE Ventas (
    Id_venta SERIAL PRIMARY KEY,
    Id_usuario INT,
    Fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Total DECIMAL(10,2),
    Status VARCHAR(20) CHECK (Status IN ('En proceso', 'Pagada', 'Enviada', 'Recibida')),
    FOREIGN KEY (Id_usuario) REFERENCES Usuarios(Id_usuario)
);

-- Tabla DetalleVenta
CREATE TABLE DetalleVenta (
    Id_venta INT,
    Id_producto INT,
    Cantidad INT,
    Precio_uni DECIMAL(10,2),
    PRIMARY KEY (Id_venta, Id_producto),
    FOREIGN KEY (Id_venta) REFERENCES Ventas(Id_venta),
    FOREIGN KEY (Id_producto) REFERENCES Productos(Id_producto)
);

-- Tabla Envio
CREATE TABLE Envio (
    Id_Envio SERIAL PRIMARY KEY,
    Id_usuario INT,
    Calle_num TEXT,
    Ciudad VARCHAR(100),
    Estado VARCHAR(100),
    Cod_postal VARCHAR(20),
    Pais VARCHAR(100),
    FOREIGN KEY (Id_usuario) REFERENCES Usuarios(Id_usuario)
);

-- Tabla TarjetaPago
CREATE TABLE TarjetaPago (
    Id_tarjeta SERIAL PRIMARY KEY,
    Id_usuario INT,
    Num_tarjeta VARCHAR(20), -- debería estar enmascarado o cifrado en práctica
    Fecha_ven DATE,
    Nombre_titular VARCHAR(100),
	CVV VARCHAR(20),
    FOREIGN KEY (Id_usuario) REFERENCES Usuarios(Id_usuario)
);

-- Tabla Calificaciones
CREATE TABLE Calificaciones (
    Id_calificacion SERIAL PRIMARY KEY,
    Id_usuario INT,
    Id_producto INT,
    Calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    Comentario TEXT,
    Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_usuario) REFERENCES Usuarios(Id_usuario),
    FOREIGN KEY (Id_producto) REFERENCES Productos(Id_producto)
);
