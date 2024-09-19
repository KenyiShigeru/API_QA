USE sitec2;
DROP DATABASE IF EXISTS qualityart;

-- Creación de la base de datos QualityArt
CREATE DATABASE IF NOT EXISTS QualityArt;

USE QualityArt;

-- Creación de tablas para productos
CREATE TABLE clasificacion (
    id_clasificacion INT NOT NULL PRIMARY KEY,
    nom_Categoria VARCHAR(25) NOT NULL
);

CREATE TABLE subclasificacion (
    id_subclasificacion INT NOT NULL PRIMARY KEY,
    nom_subcategoria VARCHAR(25) NOT NULL
);

CREATE TABLE material (
    id_material INT NOT NULL PRIMARY KEY,
    nom_material VARCHAR(25) NOT NULL
);

CREATE TABLE unidad (
    id_unidad INT NOT NULL PRIMARY KEY,
    nom_unidad VARCHAR(5) NOT NULL
);

CREATE TABLE material_produccion (
    id_tpMaterial INT NOT NULL PRIMARY KEY,
    id_material INT NOT NULL,
    id_unidad INT NOT NULL,
    medidaMaterial VARCHAR(25),
    proveedor VARCHAR(25),
    CONSTRAINT matprod_material FOREIGN KEY (id_material) REFERENCES material(id_material),
    CONSTRAINT matprod_unidad FOREIGN KEY (id_unidad) REFERENCES unidad(id_unidad)
);

-- CREATE TABLE tipopago (
--    id_tpPago INT NOT NULL PRIMARY KEY,
--    nom_tpPago VARCHAR(25) NOT NULL
-- );

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
    des_tpCliente VARCHAR(25) NOT NULL
);

CREATE TABLE proceso (
    id_Proceso INT NOT NULL PRIMARY KEY,
    descripcion VARCHAR(50),
    tipo_pago BIT
);

CREATE TABLE tipoTrabajo (
    id_tpTrabajo INT NOT NULL PRIMARY KEY,
    nom_tpTrabajo VARCHAR(50)
);

CREATE TABLE tipoVenta (
    id_tpVenta INT NOT NULL PRIMARY KEY,
    nom_tpVenta VARCHAR(50)
);

CREATE TABLE acabados (
    id_acabados INT NOT NULL PRIMARY KEY,
    nom_acabados VARCHAR(50)
);

CREATE TABLE Cliente (
    id_Cliente INT NOT NULL PRIMARY KEY,
    nom_cliente VARCHAR(25) NOT NULL,
    apPaterno VARCHAR(25) NOT NULL,
    apMaterno VARCHAR(25),
    id_tipoCliente INT NOT NULL,
    const_Fiscal BLOB,
    rfc_Cliente VARCHAR(13) NOT NULL,
    nom_Negocio VARCHAR(25) NOT NULL,
    telWP_cliente VARCHAR(10),
    telFj_cliente VARCHAR(10),
    correo_cliente VARCHAR(100) NOT NULL,
    CONSTRAINT fk_tipoCliente FOREIGN KEY (id_tipoCliente) REFERENCES tipoCliente(id_tpCliente)
);

CREATE TABLE estadoCliente (
    id_Cliente INT,
    adeudo VARCHAR(25) NOT NULL,
    CONSTRAINT fk_estado_cliente FOREIGN KEY (id_Cliente) REFERENCES Cliente(id_Cliente)
);

CREATE TABLE Producto (
    id_Producto INT NOT NULL PRIMARY KEY,
    id_clasificacion INT,
    id_subclasificacion INT,
    id_tpMaterial INT,
    id_unidad INT,
    apl_inst BOOLEAN,
    precio1_sin_s INT,
    precio2_con_s INT,
    precio3_sin_c INT,
    precio4_con_c INT,
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
    CONSTRAINT cotizacion_cliente FOREIGN KEY (id_Cliente) REFERENCES Cliente(id_Cliente)
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