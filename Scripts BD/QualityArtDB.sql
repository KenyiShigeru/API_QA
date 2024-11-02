use test;
# drop database prueba2;

create database prueba2;
use prueba2;

##########################################
########################################
########################################

## Zona Productos
create table clasificacion (
	id_clasificacion int AUTO_INCREMENT not null,
    nom_clasificacion varchar(40) not null,
    desc_clasificacion varchar(100) not null,
    PRIMARY KEY (id_clasificacion)
);

create table subClasificacion (
	id_subclasificacion int AUTO_INCREMENT not null,
    nom_subclasificacion varchar(80) not null,
	desc_subclasificacion varchar(100) not null,
    PRIMARY KEY (id_subclasificacion)
);

create table material (
	id_material int AUTO_INCREMENT not null,
    nom_material varchar(80) not null,
	desc_material varchar(100) not null,
    PRIMARY KEY (id_material)
);

create table unidad (
	id_unidad int AUTO_INCREMENT not null,
    nom_unidad varchar(20) not null,    
    desc_unidad varchar(100) not null,
    PRIMARY KEY (id_unidad)
);

create table material_produccion 
(
	id_tpMaterial int AUTO_INCREMENT not null,
    id_material int not null,
    id_unidad int not null,
    mat_base float4  not null,
    mat_altura float4 not null,
    proveedor varchar (50),
    PRIMARY KEY (id_tpMaterial),
    FOREIGN KEY (id_material) REFERENCES material(id_material),
    FOREIGN KEY (id_unidad) REFERENCES unidad(id_unidad)
);

create table  producto 
(
	id_producto int AUTO_INCREMENT not null,
    id_clasificacion int not null,
    id_subclasificacion int not null,
	id_tpMaterial int not null,
	id_unidad int not null,
    apl_inst boolean not null,
    precio_sin float4 not null, ## precion sin instalacion
    precio_con float4 not null, ## precion con instalacion
    observaciones varchar(150), ## Observaciones del producto en general
	PRIMARY KEY (id_producto),
    FOREIGN KEY (id_clasificacion) REFERENCES clasificacion(id_clasificacion),
    FOREIGN KEY (id_subclasificacion) REFERENCES subClasificacion(id_subclasificacion),
    FOREIGN KEY (id_tpMaterial) REFERENCES material_produccion(id_tpMaterial),
    FOREIGN KEY (id_unidad) REFERENCES unidad(id_unidad)
);

########################################
########################################
########################################
# Zona Clientes

create table tpCliente
(
	id_tpCliente int AUTO_INCREMENT not null,
    nom_tpcliente varchar (20) not null,
	desc_tpcliente varchar(100) not null,
    PRIMARY KEY (id_tpCliente)
);

create table cliente 
(
	id_cliente int AUTO_INCREMENT not null,
    id_tpCliente int not null,
    nom_cliente varchar (50) not null,
    apPaterno varchar (20) not null,
    apMaterno varchar (20) not null, 
    const_fiscal varchar(100), #Direcion de la imagen
    RFC_cliente varchar (15) ,
    nom_negocio varchar (50) ,
    dom_cliente varchar (50) ,
    telWP_cliente numeric(10,0) ,
    telFJ_cliente numeric(10,0) ,
    correo_cliente varchar (50) ,
	PRIMARY KEY (id_cliente),
    FOREIGN KEY (id_tpCliente) REFERENCES tpCliente(id_tpCliente) 
);

create table estadoCliente
(
	id_cliente int unique not null,
    adeudo float8 not null, # ver el estado de cuenta del cliente 
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) 
);
# #############################
########################################
########################################
########################################

# Zona Catalogos
create table acabado
(
	id_acabado int AUTO_INCREMENT not null,
	nom_acabado varchar (20) not null,
	desc_acabado varchar(100) not null,
    PRIMARY KEY (id_acabado)
);

create table tipoVenta
(
	id_tpVenta  int AUTO_INCREMENT not null,
    nom_tpVenta varchar (20) not null,
	desc_tpVenta varchar(100) not null,
    PRIMARY KEY (id_tpVenta)
);

create table tipoTrabajo
(
	id_tpTrabajo int AUTO_INCREMENT not null,
    nom_tpTrabajo varchar (20) not null,
    desc_tpTrabajo varchar(100) not null,
    PRIMARY KEY (id_tpTrabajo)
);

create table proceso
(
	id_proceso int AUTO_INCREMENT not null,
    nom_proceso varchar (20) not null,
    desc_proceso varchar(100) not null,
    PRIMARY KEY (id_proceso)
);

create table tipoPago
(
	id_tpPago int AUTO_INCREMENT not null,
    nom_tpPago varchar (20) not null,
    desc_tpPago varchar(100) not null,
    PRIMARY KEY (id_tpPago)
);

create table formaPago
(
	id_fmPago int AUTO_INCREMENT not null,
    nom_fmPago varchar (30) not null,
    desc_fmPago varchar(100) not null,
    PRIMARY KEY (id_fmPago)
);

create table estatusCobranza
(
	id_estCobranza int AUTO_INCREMENT not null,
    nom_estCobranza varchar (20) not null,
    desc_estCobranza varchar(100) not null,
    PRIMARY KEY (id_estCobranza)
);

########################################
########################################
########################################

#Tabla Cotizacion

create table cotizacion
(
	id_cotizacion int AUTO_INCREMENT not null,
    id_cliente int not null,
    id_tpVenta int not null,
    subTotal int not null,
    iva int not null, 
    total int not null,
    fechaVigencia date,  # fecha  de vigencia de la cotizacion
    estatus boolean not null,
    factura boolean not null, 
    personal varchar(100) not null,
    observacion varchar(400),
    eliminacion boolean not null,  # Activacion despues de la fecha de vigencia cuando el estatus no sea aceptada = true
    PRIMARY KEY (id_cotizacion),
	FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) ,
	FOREIGN KEY (id_tpVenta) REFERENCES tipoVenta(id_tpVenta) 
);

create table prod_cotizacion
(	
	id_cotizacion int not null,
    id_producto int not null,
    cantidad int not null, # 	numero de productos que se compraran
    prod_base float4 not null, 
    prod_altura float4 not null,
	precio_Uni float4 not null, # precio del producto por mt2
    importe float8 not null, #precio individual de cada producto, para futuros reportes de saber los productos mas vendidos    cantidad* (precio_Uni * medidas)
	FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id_cotizacion) ,
	FOREIGN KEY (id_producto) REFERENCES producto(id_producto) 
);
########################################
########################################
########################################

#Tabla relacionadas a cotizacion

create table acab_cotizacion
(
	id_cotizacion int not null,
    id_acabado int not null,
	FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id_cotizacion) ,
	FOREIGN KEY (id_acabado) REFERENCES acabado(id_acabado) 
);

create table trab_cotizacion
(
	id_cotizacion int not null,
    id_tpTrabajo int not null,
	FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id_cotizacion) ,
	FOREIGN KEY (id_tpTrabajo) REFERENCES tipoTrabajo(id_tpTrabajo) 
);

create table proc_cotizacion
(
	id_cotizacion int not null,
    id_proceso int not null,
	FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id_cotizacion) ,
	FOREIGN KEY (id_proceso) REFERENCES proceso(id_proceso) 
);



########################################
########################################
########################################

#Tabla orden de trabajo
create table ordenTrabajo
(
	id_ordenTrabajo int AUTO_INCREMENT not null,
    id_cotizacion int not null,
    id_estCobranza int not null,
    totalPagado float8 not null, ## para llevar el control del monto total pagado
	PRIMARY KEY (id_ordenTrabajo),
	FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id_cotizacion),
	FOREIGN KEY (id_estCobranza) REFERENCES estatusCobranza(id_estCobranza) 
);

create table pagoOrdenTrabajo
(
	id_pagoOrdenTrabajo int AUTO_INCREMENT not null,
    id_ordenTrabajo int not null,
    id_tpPago int not null,
    id_fmPago int not null,
    comprobante varchar(100),   # Imagen de posibles transferencias
    fecha_pago date not null, # para saber que dias se registraron cada pago
    montoPago float4 not null, ## Para los diferentes pagos saber de cuanto es cada uno
    PRIMARY KEY (id_pagoOrdenTrabajo),
	FOREIGN KEY (id_ordenTrabajo) REFERENCES ordenTrabajo(id_ordenTrabajo),
	FOREIGN KEY (id_tpPago) REFERENCES tipoPago(id_tpPago),
	FOREIGN KEY (id_fmPago) REFERENCES formaPago(id_fmPago) 
);



##Datos de la tabla de acabados
insert into acabado( nom_acabado, desc_acabado ) values ('Bastilla', "");
insert into acabado( nom_acabado, desc_acabado) values ('Ojillos', "");
insert into acabado( nom_acabado, desc_acabado) values ('Funda', "");
insert into acabado( nom_acabado, desc_acabado) values ('Fajilla', "");


##Datos para la clasificacion
insert into clasificacion( nom_clasificacion, desc_clasificacion ) values ('IMPRESIÓN DE LONA ', "");
insert into clasificacion( nom_clasificacion, desc_clasificacion) values ('VINIL CORTE', "");
insert into clasificacion( nom_clasificacion, desc_clasificacion) values ('ESTRUCTURAS PARA PUBLICIDAD', "");

##Datos para la subclasificacion
insert into subClasificacion( nom_subclasificacion, desc_subclasificacion ) values ('IMPRESIÓN DE LONA NORMAL', "");
insert into subClasificacion( nom_subclasificacion, desc_subclasificacion ) values ('ROTULACION DE UNIDAD', "");
insert into subClasificacion( nom_subclasificacion, desc_subclasificacion ) values ('STANDS', "");

#Datos de material
insert into material( nom_material, desc_material ) values ('LONA DE IMPRESIÓN', "");
insert into material( nom_material, desc_material ) values ('VINIL DE CORTE ', "");
insert into material( nom_material, desc_material ) values ('VINIL REFLEJANTE', "");

#Datos de tipos de unidad
insert into unidad( nom_unidad , desc_unidad ) values ('Rollo', "");
insert into unidad( nom_unidad, desc_unidad ) values ('PZ', "");
insert into unidad( nom_unidad, desc_unidad ) values ('MT', "");
insert into unidad( nom_unidad, desc_unidad ) values ('MT2', "");

#Datos de material de Produccion
insert into material_produccion( id_material, id_unidad, mat_base , mat_altura, proveedor) values (2, 1, 0.66666,0.56666, 'Proveedor');
insert into material_produccion( id_material, id_unidad, mat_base , mat_altura, proveedor) values (3, 1, 22223.35, 1234.69, 'Proveedor');


#Datos de los tipos de pagos
insert into tipoPago( nom_tpPago, desc_tpPago ) values('Anticipo', "");
insert into tipoPago( nom_tpPago, desc_tpPago ) values('Pago total', "");
insert into tipoPago( nom_tpPago, desc_tpPago ) values('Abono', "");
insert into tipoPago( nom_tpPago, desc_tpPago ) values('Credito', "");

#Datos de la forma de pago
insert into formaPago( nom_fmPago, desc_fmPago ) values('Efectivo', "");
insert into formaPago( nom_fmPago, desc_fmPago ) values('Cheque', "");
insert into formaPago( nom_fmPago, desc_fmPago ) values('Transaccion san QA', "");
insert into formaPago( nom_fmPago, desc_fmPago ) values('Transaccion BBVA', "");
insert into formaPago( nom_fmPago, desc_fmPago ) values('Transaccion san hcr', "");

#Datos de  los estatus de las ordenes de trabajo
insert into estatusCobranza( nom_estCobranza, desc_estCobranza ) values('Pagada', "");
insert into estatusCobranza( nom_estCobranza, desc_estCobranza ) values('Saldo pendiente', "");
insert into estatusCobranza( nom_estCobranza, desc_estCobranza ) values('Cancelada', "");
insert into estatusCobranza( nom_estCobranza, desc_estCobranza ) values('Descuento nomina', "");

#Datos de los procesos
insert into proceso( nom_proceso, desc_proceso ) values('Diseño', "");
insert into proceso(nom_proceso, desc_proceso ) values('Plotter corte', "");
insert into proceso( nom_proceso, desc_proceso ) values('Router CNC', "");
insert into proceso( nom_proceso, desc_proceso ) values('Taller', "");

#Datos de tipo de trabajo
insert into tipotrabajo( nom_tpTrabajo, desc_tpTrabajo ) values('Acabados', "");
insert into tipotrabajo( nom_tpTrabajo, desc_tpTrabajo ) values('Sin Acabados', "");
insert into tipotrabajo( nom_tpTrabajo, desc_tpTrabajo ) values('Instalacion', "");

#Datos de los tipos de venta
insert into tipoVenta(nom_tpVenta, desc_tpVenta ) values ('En mostrador', "");
insert into tipoVenta(nom_tpVenta, desc_tpVenta ) values ('Factura', "");
insert into tipoVenta(nom_tpVenta, desc_tpVenta ) values ('Orden interna QA', "");

#Datos de los tipos de Cliente
insert into tpCliente( nom_tpcliente, desc_tpcliente ) values ('Mostrador', "");
insert into tpCliente(nom_tpcliente, desc_tpcliente ) values ('Credito Autorizado', "");
insert into tpCliente( nom_tpcliente, desc_tpcliente ) values ('Trabajador QA', "");
insert into tpCliente(nom_tpcliente, desc_tpcliente ) values ('Orden interna QA', "");

