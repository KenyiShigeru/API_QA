USE ejemplo;
DROP DATABASE IF EXISTS qualityart;

-- Creación de la base de datos QualityArt
CREATE DATABASE IF NOT EXISTS QualityArt;

USE QualityArt;

-- Creación de tablas para productos
CREATE TABLE clasificacion (
    id_clasificacion INT NOT NULL PRIMARY KEY,
    nom_Categoria VARCHAR(40) NOT NULL
);

CREATE TABLE subclasificacion (
    id_subclasificacion INT NOT NULL PRIMARY KEY,
    nom_subcategoria VARCHAR(80) NOT NULL
);

CREATE TABLE material (
    id_material INT NOT NULL PRIMARY KEY,
    nom_material VARCHAR(80) NOT NULL
);

CREATE TABLE unidad (
    id_unidad INT NOT NULL PRIMARY KEY,
    nom_unidad VARCHAR(5) NOT NULL
);

CREATE TABLE material_produccion (
    id_tpMaterial INT NOT NULL PRIMARY KEY,
    id_material INT NOT NULL,
    id_unidad INT NOT NULL,
    medidaMaterial VARCHAR(10),
    proveedor VARCHAR(30),
    CONSTRAINT matprod_material FOREIGN KEY (id_material) REFERENCES material(id_material),
    CONSTRAINT matprod_unidad FOREIGN KEY (id_unidad) REFERENCES unidad(id_unidad)
);

 CREATE TABLE tipopago (
    id_tpPago INT NOT NULL PRIMARY KEY,
    nom_tpPago VARCHAR(25) NOT NULL
 );

CREATE TABLE formapago (
    id_fmPago INT NOT NULL PRIMARY KEY,
    nom_fmPago VARCHAR(25) NOT NULL
);

CREATE TABLE estatuscobranza (
    id_estCobranza INT NOT NULL PRIMARY KEY,
    nom_estCobranza VARCHAR(25) NOT NULL
);

CREATE TABLE tipoCliente (
    id_tpCliente INT NOT NULL PRIMARY KEY,
    des_tpCliente VARCHAR(20) NOT NULL
);

CREATE TABLE proceso (
    id_Proceso INT NOT NULL PRIMARY KEY,
    descripcion VARCHAR(50),
    tipo_pago BIT
);

CREATE TABLE tipoTrabajo (
    id_tpTrabajo INT NOT NULL PRIMARY KEY,
    nom_tpTrabajo VARCHAR(20)
);

CREATE TABLE tipoVenta (
    id_tpVenta INT NOT NULL PRIMARY KEY,
    nom_tpVenta VARCHAR(20)
);

CREATE TABLE acabados (
    id_acabados INT NOT NULL PRIMARY KEY,
    nom_acabados VARCHAR(20)
);

CREATE TABLE Cliente (
    id_Cliente INT NOT NULL PRIMARY KEY,
    id_tipoCliente INT NOT NULL,
    nom_cliente VARCHAR(50) NOT NULL,
    apPaterno VARCHAR(20) NOT NULL,
    apMaterno VARCHAR(20),
    const_Fiscal varchar(200),
    rfc_Cliente VARCHAR(13) NOT NULL,
    nom_Negocio VARCHAR(25) NOT NULL,
    telWP_cliente VARCHAR(10),
    telFj_cliente VARCHAR(10),
    correo_cliente VARCHAR(100) NOT NULL,
    CONSTRAINT fk_tipoCliente FOREIGN KEY (id_tipoCliente) REFERENCES tipoCliente(id_tpCliente)
);

CREATE TABLE estadoCliente (
    id_Cliente INT,
    adeudo int,
    CONSTRAINT fk_estado_cliente FOREIGN KEY (id_Cliente) REFERENCES Cliente(id_Cliente)
);

CREATE TABLE Producto (
    id_Producto INT NOT NULL PRIMARY KEY,
    id_clasificacion INT not null,
    id_subclasificacion INT not null,
    id_tpMaterial INT not null,
    id_unidad INT not null,
    apl_inst BOOLEAN not null, 
    precio1_sin_s INT, ##Precio sin instalacion
    precio2_con_s INT, ##Precio con instalacion
    observaciones VARCHAR(100),
    CONSTRAINT fk_clasificacion_producto FOREIGN KEY (id_clasificacion) REFERENCES clasificacion(id_clasificacion),
    CONSTRAINT fk_subclasificacion_producto FOREIGN KEY (id_subclasificacion) REFERENCES subclasificacion(id_subclasificacion),
    CONSTRAINT fk_producto_tpMaterial FOREIGN KEY (id_tpMaterial) REFERENCES material_produccion(id_tpMaterial),
    CONSTRAINT fk_unidad_producto FOREIGN KEY (id_unidad) REFERENCES unidad(id_unidad)
);

CREATE TABLE cotizacion (
    id_cotizacion INT NOT NULL PRIMARY KEY,
    id_Cliente INT,
    id_tipoVenta int, -- Innecesario
    subTotal INT NOT NULL,
    iva INT NOT NULL,
    total INT NOT NULL,
    fechaVigencia DATE NOT NULL,
    estatus BOOLEAN NOT NULL,
    observaciones VARCHAR(50),
    CONSTRAINT cotizacion_cliente FOREIGN KEY (id_Cliente) REFERENCES Cliente(id_Cliente),
    constraint cotizacion_tipoventa foreign key (id_tipoVenta) references tipoVenta(id_tpVenta)
);

CREATE TABLE ordenTrabajo (
    id_ordenTrabajo INT NOT NULL PRIMARY KEY,
    id_cotizacion INT NOT NULL,
    id_estCobranza INT NOT NULL,
    CONSTRAINT ord_cotiz FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id_cotizacion),
    CONSTRAINT ord_est FOREIGN KEY (id_estCobranza) REFERENCES estatuscobranza(id_estCobranza)
);

-- Tablas intermedias
CREATE TABLE trab_cotizacion (
    id_cotizacion INT NOT NULL,
    id_tpTrabajo INT NOT NULL,
    CONSTRAINT trab_cotiz FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id_cotizacion),
    CONSTRAINT cotiz_trab FOREIGN KEY (id_tpTrabajo) REFERENCES tipoTrabajo(id_tpTrabajo)
);

CREATE TABLE acab_cotizacion (
    id_cotizacion INT NOT NULL,
    id_acabados INT NOT NULL,
    CONSTRAINT acab_cotiz FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id_cotizacion),
    CONSTRAINT cotiz_acab FOREIGN KEY (id_acabados) REFERENCES acabados(id_acabados)
);

CREATE TABLE prod_cotizacion (
    id_cotizacion INT NOT NULL,
    id_Producto INT NOT NULL,
    CONSTRAINT prod_cotiz FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id_cotizacion),
    CONSTRAINT cotiz_prod FOREIGN KEY (id_Producto) REFERENCES Producto(id_Producto)
);

CREATE TABLE proc_cotizacion (
    id_cotizacion INT NOT NULL,
    id_Proceso INT NOT NULL,
    CONSTRAINT proc_cotiz FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id_cotizacion),
    CONSTRAINT cotiz_proc FOREIGN KEY (id_Proceso) REFERENCES proceso(id_Proceso)
);

CREATE TABLE pagoOrdenTrabajo (
    id_ordenTrabajo INT NOT NULL,
    id_tpPago INT NOT NULL,
    id_fmPago INT NOT NULL,
    CONSTRAINT pagar_trabajo FOREIGN KEY (id_ordenTrabajo) REFERENCES ordenTrabajo(id_ordenTrabajo),
    CONSTRAINT orden_tipo_pago FOREIGN KEY (id_tpPago) REFERENCES tipopago(id_tpPago),
    CONSTRAINT orden_forma FOREIGN KEY (id_fmPago) REFERENCES formapago(id_fmPago)
);






-- -- -------------------------------------------------------------------------
##Datos de la tabla de acabados
insert into acabados(id_acabados, nom_acabados) values (1,'Bastilla');
insert into acabados(id_acabados, nom_acabados) values (2,'Ojillos');
insert into acabados(id_acabados, nom_acabados) values (3,'Funda');
insert into acabados(id_acabados, nom_acabados) values (4,'Fajilla');


##Datos para la clasificacion
insert into clasificacion(id_clasificacion, nom_categoria) values (1,'Impresion de lona normal');
insert into clasificacion(id_clasificacion, nom_categoria) values (2,'Rotulacion de unidad');
insert into clasificacion(id_clasificacion, nom_categoria) values (3,'Imprenta de notas de venta');

#Datos de material
insert into material(id_material, nom_material) values (1,'Lona de impresion');
insert into material(id_material, nom_material) values (2,'Vinil de corte');
insert into material(id_material, nom_material) values (3,'Papel bond');

#Datos de tipos de unidad
insert into unidad(id_unidad, nom_unidad) values (1,'Rollo');
insert into unidad(id_unidad, nom_unidad) values (2,'PZ');
insert into unidad(id_unidad, nom_unidad) values (3,'MT');
insert into unidad(id_unidad, nom_unidad) values (4,'MT2');

#Datos de los tipos de pagos
insert into tipoPago(id_tpPago, nom_tpPago) values(1,'Anticipo');
insert into tipoPago(id_tpPago, nom_tpPago) values(2,'Pago total');
insert into tipoPago(id_tpPago, nom_tpPago) values(3,'Abono');
insert into tipoPago(id_tpPago, nom_tpPago) values(4,'Credito');

#Datos de la forma de pago
insert into formaPago(id_fmPago, nom_fmPago) values(1,'Efectivo');
insert into formaPago(id_fmPago, nom_fmPago) values(2,'Cheque');
insert into formaPago(id_fmPago, nom_fmPago) values(3,'Transaccion san QA');
insert into formaPago(id_fmPago, nom_fmPago) values(4,'Transaccion BBVA');
insert into formaPago(id_fmPago, nom_fmPago) values(5,'Transaccion san hcr');

#Datos de  los estatus de las ordenes de trabajo
insert into estatusCobranza(id_estCobranza, nom_estCobranza) values(1,'Pagada');
insert into estatusCobranza(id_estCobranza, nom_estCobranza) values(2,'Saldo pendiente');
insert into estatusCobranza(id_estCobranza, nom_estCobranza) values(3,'Cancelada');
insert into estatusCobranza(id_estCobranza, nom_estCobranza) values(4,'Descuento nomina');

#Datos de los procesos
insert into proceso(id_Proceso, descripcion) values(1,'Diseño');
insert into proceso(id_Proceso, descripcion) values(2,'Plotter corte');
insert into proceso(id_Proceso, descripcion) values(3,'Router CNC');
insert into proceso(id_Proceso, descripcion) values(4,'Taller');

#Datos de tipo de trabajo
insert into tipotrabajo(id_tpTrabajo, nom_tpTrabajo) values(1,'Acabados');
insert into tipotrabajo(id_tpTrabajo, nom_tpTrabajo) values(2,'Sin Acabados');
insert into tipotrabajo(id_tpTrabajo, nom_tpTrabajo) values(3,'Instalacion');

#Datos de los tipos de venta
insert into tipoVenta(id_tpVenta, nom_tpVenta) values (1,'En mostrador');
insert into tipoVenta(id_tpVenta, nom_tpVenta) values (2,'Factura');
insert into tipoVenta(id_tpVenta, nom_tpVenta) values (3,'Orden interna QA');