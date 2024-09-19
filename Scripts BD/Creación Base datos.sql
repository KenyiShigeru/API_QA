-- Creación de la base de datos QualityArt
CREATE DATABASE QualityArt;
GO

USE QualityArt;
GO

-- Creación de tablas para productos

CREATE TABLE Categoria (
    id_Categoria INT NOT NULL PRIMARY KEY,
    nombreClasificacion VARCHAR(25) NOT NULL
);

CREATE TABLE Producto (
    id_Producto INT NOT NULL PRIMARY KEY,
    nombreProducto VARCHAR(25) NOT NULL,
    id_Categoria INT NOT NULL,
    CONSTRAINT FK_Producto_Categoria FOREIGN KEY (id_Categoria) REFERENCES Categoria(id_Categoria)
);

CREATE TABLE Material (
    id_Material INT NOT NULL PRIMARY KEY,
    nombre_MatUtilizado VARCHAR(25),
    cantidad INT NOT NULL
);

-- Creación de tablas para clientes

CREATE TABLE TipoCliente (
    id_tipoCliente INT NOT NULL PRIMARY KEY,
    descripcion VARCHAR(50)
);

CREATE TABLE Cliente (
    id_Cliente INT NOT NULL PRIMARY KEY,
    nomCliente VARCHAR(25) NOT NULL,
    apPaterno VARCHAR(25) NOT NULL,
    apMaterno VARCHAR(25),
    const_Fiscal VARCHAR(20) NOT NULL,
    rfc_Cliente VARCHAR(13) NOT NULL,
    nom_Negocio VARCHAR(25) NOT NULL,
    telWP_cliente VARCHAR(10),
    telFj_cliente VARCHAR(10),
    correo_cliente VARCHAR(100) NOT NULL,
    id_tipoCliente INT NOT NULL,
    CONSTRAINT FK_Cliente_TipoCliente FOREIGN KEY (id_tipoCliente) REFERENCES TipoCliente(id_tipoCliente)
);

CREATE TABLE Forma_Pago (
    id_FormaPago INT NOT NULL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE Venta (
    id_Venta INT NOT NULL PRIMARY KEY,
    total MONEY NOT NULL,
    saldoPendiente MONEY NOT NULL,
    id_Cliente INT NOT NULL,
    id_FormaPago INT NOT NULL,
    CONSTRAINT FK_Venta_Cliente FOREIGN KEY (id_Cliente) REFERENCES Cliente(id_Cliente),
    CONSTRAINT FK_Venta_FormaPago FOREIGN KEY (id_FormaPago) REFERENCES Forma_Pago(id_FormaPago)
);

-- Creación de la tabla para procesos

CREATE TABLE Proceso (
    id_Proceso INT NOT NULL PRIMARY KEY,
    descripcion VARCHAR(50),
    tipo_pago BIT
);


