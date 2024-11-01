create database prueba2;
use prueba2;

##########################################
########################################
########################################

## Zona Productos
create table clasificacion (
	id_clasificacion int AUTO_INCREMENT not null,
    nom_clasificacion varchar(40) not null,
    descripcion varchar(100),
    PRIMARY KEY (id_clasificacion)
);

create table subClasificacion (
	id_subclasificacion int AUTO_INCREMENT not null,
    nom_subclasificacion varchar(80) not null,
    descripcion varchar(100),
    PRIMARY KEY (id_subclasificacion)
);

create table material (
	id_material int AUTO_INCREMENT not null,
    nom_material varchar(80) not null,
    descripcion varchar(100),
    PRIMARY KEY (id_material)
);

create table unidad (
	id_unidad int AUTO_INCREMENT not null,
    nom_unidad varchar(20) not null,
    descripcion varchar(100),
    PRIMARY KEY (id_unidad)
);

create table material_produccion 
(
	id_tpMaterial int AUTO_INCREMENT not null,
    id_material int not null,
    id_unidad int not null,
    medidaMaterial varchar(10) not null,
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
    apl_desc boolean not null,
    precio_sin int not null, ## precion sin instalacion
    precio_con int not null, ## precion con instalacion
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
    descripcion varchar(100),
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
    adeudo int not null, # ver el estado de cuenta del cliente 
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
    descripcion varchar(100),
    PRIMARY KEY (id_acabado)
);

create table tipoVenta
(
	id_tpVenta  int AUTO_INCREMENT not null,
    nom_tpVenta varchar (20) not null,
    descripcion varchar(100),
    PRIMARY KEY (id_tpVenta)
);

create table tipoTrabajo
(
	id_tpTrabajo int AUTO_INCREMENT not null,
    nom_tpTrabajo varchar (20) not null,
    descripcion varchar(100),
    PRIMARY KEY (id_tpTrabajo)
);

create table proceso
(
	id_proceso int AUTO_INCREMENT not null,
    nom_proceso varchar (20) not null,
    descripcion varchar(100),
    PRIMARY KEY (id_proceso)
);

create table tipoPago
(
	id_tpPago int AUTO_INCREMENT not null,
    nom_tpPago varchar (20) not null,
    descripcion varchar(100),
    PRIMARY KEY (id_tpPago)
);

create table formaPago
(
	id_fmPago int AUTO_INCREMENT not null,
    nom_fmPago varchar (20) not null,
    descripcion varchar(100),
    PRIMARY KEY (id_fmPago)
);

create table estatusCobranza
(
	id_estCobranza int AUTO_INCREMENT not null,
    nom_estCobranza varchar (20) not null,
    descripcion varchar(100),
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
    medidas varchar(11) not null, ## ejemplo : 12.5x12.5 = 9 caracteres y 2 de tomar en cuenta
	precio int not null, # precio individual de cada producto, para futuros reportes de saber los productos mas vendidos
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
    totalPagado int not null, ## para llevar el control del monto total pagado
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
    montoPago int not null, ## Para los diferentes pagos saber de cuanto es cada uno
    PRIMARY KEY (id_pagoOrdenTrabajo),
	FOREIGN KEY (id_ordenTrabajo) REFERENCES ordenTrabajo(id_ordenTrabajo),
	FOREIGN KEY (id_tpPago) REFERENCES tipoPago(id_tpPago),
	FOREIGN KEY (id_fmPago) REFERENCES formaPago(id_fmPago) 
);


########################################
########################################
########################################
# Procedimiento Almacenado 

#		AGREGAR TIPO DE CLIENTE
DELIMITER //
Create procedure agg_tipoCliente (
    IN p_nom_tpcliente    VARCHAR(20)
)
BEGIN
	insert into tpCliente (  nom_tpcliente   ) 
    values( p_nom_tpcliente);
END //
DELIMITER ;

#AGREGAR CLIENTE  -- REGRESA EL ID DEL CLIENTE AGREGADO
DELIMITER //
create procedure agg_cliente (
    IN p_nom_cliente VARCHAR(50),
    IN p_apPaterno VARCHAR(20),
    IN p_apMaterno VARCHAR(20),
	IN p_const_fiscal varchar(100),
    IN p_rfc_cliente VARCHAR(15),
    IN p_nom_negocio VARCHAR(50),
    IN p_dom_cliente VARCHAR(50),
    IN p_telWP_cliente numeric(10,0),
    IN p_telFJ_cliente numeric(10,0),
    IN p_correo_cliente VARCHAR(50), 
    IN p_id_tpCliente INT
)
BEGIN
	Declare id_registrado int;
	insert into cliente (nom_cliente, apPaterno, apMaterno, const_fiscal, RFC_cliente, nom_negocio, dom_cliente, telWP_cliente, telFJ_cliente, correo_cliente, id_tpCliente) 
    values( p_nom_cliente, p_apPaterno, p_apMaterno, p_const_fiscal,p_rfc_cliente, p_nom_negocio, p_dom_cliente, p_telWP_cliente, p_telFJ_cliente, p_correo_cliente, p_id_tpCliente);
    
    
    
    SET id_registrado = LAST_INSERT_ID();
    
    insert into estadoCliente(id_cliente , adeudo ) values(id_registrado, 0); # Se inicializa el estado del cliente
	
    select id_registrado;
    
END //
DELIMITER ;


DELIMITER //
create procedure obtenerClientes ()
BEGIN
	select * from cliente;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_clientes(
	IN p_id_registrado INT,
	IN p_nom_cliente VARCHAR(50),
    IN p_apPaterno VARCHAR(20),
    IN p_apMaterno VARCHAR(20),
	IN p_const_fiscal varchar(100),
    IN p_rfc_cliente VARCHAR(15),
    IN p_nom_negocio VARCHAR(50),
    IN p_dom_cliente VARCHAR(50),
    IN p_telWP_cliente numeric(10,0),
    IN p_telFJ_cliente numeric(10,0),
    IN p_correo_cliente VARCHAR(50), 
    IN p_id_tpCliente INT
)
BEGIN
	UPDATE cliente
    SET nom_cliente = p_nom_cliente, 
        apPaterno =p_apPaterno, 
        apMaterno =p_apMaterno, 
        const_fiscal = p_const_fiscal, 
        RFC_cliente = p_rfc_cliente, 
        nom_negocio = p_nom_negocio, 
        dom_cliente = p_dom_cliente, 
        telWP_cliente =p_telWP_cliente, 
        telFJ_cliente =p_telFJ_cliente, 
        correo_cliente =p_correo_cliente, 
        id_tpCliente = p_id_tpCliente
        WHERE id_cliente = p_id_registrado;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ;


#

# DAR DE ALTA CATALOGOS DE PRODUCTOS

#		AGREGAR CLASIFICACION
DELIMITER //
create procedure agg_clasificacion (
    IN p_nom_clasificacion VARCHAR (40),
    in p_descripcion varchar(100)
)
BEGIN
	insert into clasificacion ( nom_clasificacion,descripcion) 
    values( p_nom_clasificacion, p_descripcion);
END //
DELIMITER ;

DELIMITER //
Create procedure obtener_clasificaciones()
BEGIN
	select * from clasificacion;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_clasificaciones(p_id int, 
p_Nuevonombre varchar(40),
p_descripcion varchar(100))
BEGIN
	UPDATE clasificacion
    SET nom_clasificacion = p_Nuevonombre,
        descripcion = p_descripcion  
        WHERE id_clasificacion = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ;



#	AGREGAR	SUB---CLASIFICACION
DELIMITER //
create procedure agg_subClasificacion (
    IN p_nom_subclasificacion VARCHAR (80),
    IN p_descripcion varchar(100)
)
BEGIN
	insert into subClasificacion ( nom_subclasificacion, descripcion) 
    values( p_nom_subclasificacion, p_descripcion);
END //
DELIMITER ;

DELIMITER //
Create procedure obtener_subclasificaciones()
BEGIN
	select * from subclasificacion;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_subclasificaciones(
p_id int, 
p_Nuevonombre varchar(40),
p_descripcion varchar(100))
BEGIN
	UPDATE subclasificacion
    SET nom_subclasificacion = p_Nuevonombre,
        descripcion = p_descripcion  
        WHERE id_subclasificacion = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ; 

#		AGREGAR MATERIAL
DELIMITER //
create procedure agg_material (
    IN p_nom_material VARCHAR (80),
    IN p_descripcion varchar(100)
)
BEGIN
	insert into material ( nom_material, descripcion) 
    values( p_nom_material, p_descripcion);
END //
DELIMITER ;

DELIMITER //
Create procedure obtener_material()
BEGIN
	select * from material;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_material(
p_id int, 
p_Nuevonombre varchar(40),
p_descripcion varchar(100)
)
BEGIN
	UPDATE material
    SET nom_material = p_Nuevonombre,
        descripcion = p_descripcion  
        WHERE id_material = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ; 

#		AGREGAR UNIDAD
DELIMITER //
create procedure agg_unidad (
    IN p_nom_unidad VARCHAR(10),
    IN p_descripcion varchar(100)
)
BEGIN
	insert into unidad ( nom_unidad, descripcion) 
    values( p_nom_unidad, p_descripcion);
END //
DELIMITER ;

DELIMITER //
create procedure mod_unidad(
p_id int, 
p_Nuevonombre varchar(40),
p_descripcion varchar(100)
)
BEGIN
	UPDATE unidad
    SET nom_unidad = p_Nuevonombre,
        descripcion = p_descripcion  
        WHERE id_unidad = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ; 

#		AGREGAR MATERIAL PARA PRODUCCION
DELIMITER //
Create procedure agg_material_produccion (
    IN p_id_material INT,
	IN p_id_unidad INT,
    IN p_medidaMaterial VARCHAR(10),
    IN p_proveedor VARCHAR(30)
)
BEGIN
	insert into material_produccion ( id_material, id_unidad, medidaMaterial, proveedor) 
    values( p_id_material, p_id_unidad, p_medidaMaterial, p_proveedor);
END //
DELIMITER ;

DELIMITER //
create procedure obtener_mat_prod()
BEGIN
	select * from material_produccion;
END //
DELIMITER ; 

DELIMITER //
create procedure mod_mat_prod(
	p_id int, 
    IN p_id_material INT,
	IN p_id_unidad INT,
    IN p_medidaMaterial VARCHAR(10),
    IN p_proveedor VARCHAR(30)
)
BEGIN
	UPDATE material_produccion
    SET nom_unidad = p_Nuevonombre,
        descripcion = p_descripcion  
        WHERE id_unidad = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ; 

#AGREGAR PRODUCTO   - REGRESA EL ID DEL PRODUCTO
DELIMITER //
create procedure agg_producto (
    IN p_id_clasificacion  INT,
    IN p_id_subclasificacion INT,
    IN p_id_tpMaterial  INT,
	IN p_id_unidad  INT,
    IN p_apl_desc BOOLEAN,
	IN p_precio_sin  INT,
    IN p_precio_con   INT,
	IN p_observaciones varchar(200)
)
BEGIN

	insert into producto  (id_clasificacion , id_subclasificacion , id_tpMaterial , id_unidad , apl_desc , precio_sin , precio_con , observaciones ) 
    values( p_id_clasificacion, p_id_subclasificacion, p_id_tpMaterial, p_id_unidad,p_apl_desc, p_precio_sin, p_precio_con, p_observaciones);
    
END //
DELIMITER ;

DELIMITER //
create procedure obtener_productos()
BEGIN
	select * from producto;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_productos(
	IN p_id int,
    IN p_id_clasificacion  INT,
    IN p_id_subclasificacion INT,
    IN p_id_tpMaterial  INT,
	IN p_id_unidad  INT,
    IN p_apl_desc BOOLEAN,
	IN p_precio_sin  INT,
    IN p_precio_con   INT,
	IN p_observaciones varchar(200)
)
BEGIN
	UPDATE producto
    SET id_clasificacion = p_id_clasificacion, 
        id_subclasificacion = p_id_subclasificacion, 
        id_tpMaterial = p_id_tpMaterial, 
        id_unidad = p_id_unidad, 
        apl_desc = p_apl_desc, 
        precio_sin = p_precio_sin, 
        precio_con = p_precio_con, 
        observaciones = p_observacion
    
        WHERE id_unidad = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ; 

#		AGREGAR ACABADO
DELIMITER //
create procedure agg_acabado (
    IN p_nom_acabado VARCHAR(20),
    IN p_descripcion varchar(100)
)
BEGIN
	insert into acabado ( nom_acabado, descripcion) 
    values( p_nom_acabado, p_descripcion);
END //
DELIMITER ;

DELIMITER //
create procedure obtener_acabados()
BEGIN
	select * from acabado;
END //
DELIMITER ; 

DELIMITER //
create procedure modificar_acabado(
	p_id int, 
    IN p_nom_acabado varchar(20),
    IN p_descripcion VARCHAR(100)
)
BEGIN
	UPDATE acabado
    SET nom_acabado = p_nom_acabado,
        descripcion = p_descripcion  
        WHERE id_acabado = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ; 

#		AGREGAR TIPO DE VENTA
DELIMITER //
Create procedure agg_tipoVenta (
    IN p_nom_tpVenta VARCHAR(20),
    IN p_descripcion varchar(100)
)
BEGIN
	insert into tipoVenta ( nom_tpVenta, descripcion) 
    values( p_nom_tpVenta, p_descripcion);
END //
DELIMITER ;

DELIMITER //
Create procedure obtener_tipoVenta()
BEGIN
    select * from tipoVenta;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_tipoVenta(
    p_id int, 
    IN p_nom_tpVenta varchar(20),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    UPDATE tipoVenta
    SET nom_tpVenta = p_nom_tpVenta,
        descripcion = p_descripcion  
        WHERE id_tpVenta = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //

#		AGREGAR TIPO DE TRABAJO
DELIMITER //
create procedure agg_tipoTrabajo (
    IN p_nom_tpTrabajo VARCHAR(20),
    IN p_descripcion varchar(100)
)
BEGIN
	insert into tipoTrabajo ( nom_tpTrabajo, descripcion) 
    values( p_nom_tpTrabajo, p_descripcion);
END //
DELIMITER ;

DELIMITER //
Create procedure obtener_tipoTrabajo()
BEGIN
    select * from tipoTrabajo;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_tipoTrabajo(
    p_id int, 
    IN p_nom_tpTrabajo varchar(20),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    UPDATE tipoTrabajo
    SET nom_tpTrabajo = p_nom_tpTrabajo,
        descripcion = p_descripcion  
        WHERE id_tpTrabajo = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //

#		AGREGAR PROCESOS
DELIMITER //
create procedure agg_proceso (
    IN p_nom_proceso  VARCHAR(20),
    IN p_descripcion varchar(100)
)
BEGIN
	insert into proceso ( nom_proceso, descripcion ) 
    values( p_nom_proceso, p_descripcion);
END //
DELIMITER ;

DELIMITER //
Create procedure obtener_procesos()
BEGIN
    select * from proceso;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_procesos(
    p_id int, 
    IN p_nom_proceso varchar(20),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    UPDATE proceso
    SET nom_proceso = p_nom_proceso,
        descripcion = p_descripcion  
        WHERE id_proceso = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //



#		AGREGAR TIPO DE PAGO
DELIMITER //
create procedure agg_tipoPago (
    IN p_nom_tpPago  VARCHAR(20),
    IN p_descripcion varchar(100)
)
BEGIN
	insert into tipoPago (  nom_tpPago , descripcion) 
    values( p_nom_tpPago, p_descripcion);
END //
DELIMITER ;

DELIMITER //
Create procedure obtener_tipoPago()
BEGIN
    select * from tipoPago;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_tipoPago(
    p_id int, 
    IN p_nom_tpPago varchar(20),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    UPDATE tipoPago
    SET nom_tpPago = p_nom_tpPago,
        descripcion = p_descripcion  
        WHERE id_tpPago = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ;


#		AGREGAR FORMA DE PAGO
DELIMITER //
create procedure agg_formaPago (
    IN p_nom_fmPago   VARCHAR(20),
    IN p_descripcion varchar(100)
)
BEGIN
	insert into formaPago (  nom_fmPago , descripcion) 
    values( p_nom_fmPago, p_descripcion);
END //
DELIMITER ;

DELIMITER //
Create procedure obtener_formaPago()
BEGIN
    select * from formaPago;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_formaPago(
    p_id int, 
    IN p_nom_fmPago varchar(20),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    UPDATE formaPago
    SET nom_fmPago = p_nom_fmPago,
        descripcion = p_descripcion  
        WHERE id_fmPago = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ;


#		AGREGAR ESTATUS DE COBRANZA
DELIMITER //
create procedure agg_estatusCobranza (
    IN p_nom_estCobranza    VARCHAR(20),
    IN p_descripcion varchar(100)
)
BEGIN
	insert into estatusCobranza (  nom_estCobranza  , descripcion ) 
    values( p_nom_estCobranza, p_descripcion);
END //
DELIMITER ;

DELIMITER //
Create procedure obtener_estatusCobranza()
BEGIN
    select * from estatusCobranza;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_estatusCobranza(
    p_id int, 
    IN p_nom_estCobranza varchar(20),
    IN p_descripcion VARCHAR(100)
)
BEGIN
    UPDATE estatusCobranza
    SET nom_estCobranza = p_nom_estCobranza,
        descripcion = p_descripcion  
        WHERE id_estCobranza = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ;




#AGREGAR COTIZACION   -- REGRESA EL ULTIMO ID REGISTRADO PARA PODER LLAMAR A LOS OTROS PROCEDIMIENTOS CON EL
DELIMITER //
create procedure agg_cotizacion (
    IN p_id_cliente  INT,
    IN p_id_tpVenta  INT,
    IN p_subTotal  INT,
	IN p_iva INT,
    IN p_total  INT,
    IN p_fechaVigencia  date,
	IN p_estatus  BOOLEAN,
    IN p_factura  BOOLEAN,
    IN p_personal  VARCHAR(50),
    IN p_observacion  VARCHAR(400),
	IN p_eliminacion  BOOLEAN,
	OUT id_registrado INT
)
BEGIN

	insert into cotizacion (id_cliente , id_tpVenta , subTotal , iva , total , fechaVigencia , estatus , factura , personal , observacion , eliminacion) 
    values( p_id_cliente, p_id_tpVenta, p_subTotal, p_iva,p_total, p_fechaVigencia, p_estatus, p_factura, p_personal, p_observacion, p_eliminacion);
    
    SET id_registrado = LAST_INSERT_ID();

END //
DELIMITER ;

DELIMITER //
create procedure obtener_cotizaciones()
BEGIN
    select * from cotizacion;
END //
DELIMITER ;

DELIMITER //
create procedure modificar_cotizaciones(
    IN p_id_registrado INT,
    IN p_id_cliente  INT,
    IN p_id_tpVenta  INT,
    IN p_subTotal  INT,
    IN p_iva INT,
    IN p_total  INT,
    IN p_fechaVigencia  date,
    IN p_estatus  BOOLEAN,
    IN p_factura  BOOLEAN,
    IN p_personal  VARCHAR(50),
    IN p_observacion  VARCHAR(400),
    IN p_eliminacion  BOOLEAN
)
BEGIN
    UPDATE cotizacion
    SET id_cliente = p_id_cliente, 
        id_tpVenta = p_id_tpVenta, 
        subTotal = p_subTotal, 
        iva = p_iva, 
        total = p_total, 
        fechaVigencia = p_fechaVigencia, 
        estatus = p_estatus, 
        factura = p_factura, 
        personal = p_personal, 
        observacion = p_observacion, 
        eliminacion = p_eliminacion
        WHERE id_cotizacion = p_id_registrado;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la cotizacion con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Cotizacion actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ;


#		AGREGAR ACABADO POR COTIZACION
DELIMITER //
Create procedure agg_acab_cotizacion (
    IN p_id_cotizacion INT,
    IN p_id_acabado  INT
)
BEGIN
	insert into acab_cotizacion (  id_cotizacion  ,  id_acabado ) 
    values( p_id_cotizacion, p_id_acabado);
END //
DELIMITER ;

#		AGREGAR TRABAJOS POR COTIZACION
DELIMITER //
Create procedure agg_trab_cotizacion (
    IN p_id_cotizacion INT,
    IN p_id_tpTrabajo  INT
)
BEGIN
	insert into trab_cotizacion (  id_cotizacion  ,  id_tpTrabajo  ) 
    values( p_id_cotizacion, p_id_tpTrabajo);
END //
DELIMITER ;

#		AGREGAR PROCESOS POR COTIZACION
DELIMITER //
Create procedure agg_proc_cotizacion (
    IN p_id_cotizacion INT,
    IN p_id_proceso   INT
)
BEGIN
	insert into proc_cotizacion (  id_cotizacion  ,  id_proceso   ) 
    values( p_id_cotizacion, p_id_proceso);
END //
DELIMITER ;

#		AGREGAR PRODUCTOS POR COTIZACION
DELIMITER //
Create procedure agg_product_cotizacion (
    IN p_id_cotizacion INT,
    IN p_id_producto    INT,
    IN p_medidas VARCHAR(11),
    IN p_precio INT
)
BEGIN
	insert into prod_cotizacion (  id_cotizacion  ,  id_producto   ,medidas  ,precio ) 
    values( p_id_cotizacion, p_id_producto, p_medidas, p_precio);
END //
DELIMITER ;

#		AGREGAR ORDEN DE TRABAJO  // VENTA
DELIMITER //
Create procedure agg_ordenTrabajo (
    IN p_id_cotizacion INT,
    IN p_id_estCobranza    INT,
    IN p_totalPagado  INT
)
BEGIN
	insert into ordenTrabajo (  id_cotizacion  ,  id_estCobranza    ,totalPagado) 
    values( p_id_cotizacion, p_id_estCobranza, p_totalPagado);
END //
DELIMITER ;


#		AGREGAR PAGO POR ORDEN DE TRABAJO
DELIMITER //
Create procedure agg_pagoOrdenTrabajo (
    IN p_id_ordenTrabajo  INT,
    IN p_id_tpPago     INT,
    IN p_id_fmPago  INT,
    IN p_comprobante VARCHAR(100),
    IN p_fechaPago DATE,
    IN p_monto INT 
)
BEGIN
	insert into pagoOrdenTrabajo (  id_ordenTrabajo   ,  id_tpPago     ,id_fmPago , comprobante , fecha_pago , montoPago ) 
    values( p_id_ordenTrabajo, p_id_tpPago, p_id_fmPago , p_comprobante, p_fechaPago, p_monto);
END //
DELIMITER ;


# EDITAR INFO CLIENTE
#AGREGAR CLIENTE  -- REGRESA EL ID DEL CLIENTE AGREGADO


##Datos de la tabla de acabados
insert into acabado( nom_acabado) values ('Bastilla');
insert into acabado( nom_acabado) values ('Ojillos');
insert into acabado( nom_acabado) values ('Funda');
insert into acabado( nom_acabado) values ('Fajilla');


##Datos para la clasificacion
insert into clasificacion( nom_clasificacion) values ('IMPRESIÓN DE LONA ');
insert into clasificacion( nom_clasificacion) values ('VINIL CORTE');
insert into clasificacion( nom_clasificacion) values ('ESTRUCTURAS PARA PUBLICIDAD');

##Datos para la subclasificacion
insert into subClasificacion( nom_subclasificacion) values ('IMPRESIÓN DE LONA NORMAL');
insert into subClasificacion( nom_subclasificacion) values ('ROTULACION DE UNIDAD');
insert into subClasificacion( nom_subclasificacion) values ('STANDS');

#Datos de material
insert into material( nom_material) values ('LONA DE IMPRESIÓN');
insert into material( nom_material) values ('VINIL DE CORTE ');
insert into material( nom_material) values ('VINIL REFLEJANTE');


#Datos de tipos de unidad
insert into unidad( nom_unidad) values ('Rollo');
insert into unidad( nom_unidad) values ('PZ');
insert into unidad( nom_unidad) values ('MT');
insert into unidad( nom_unidad) values ('MT2');

#Datos de los tipos de pagos
insert into tipoPago( nom_tpPago) values('Anticipo');
insert into tipoPago( nom_tpPago) values('Pago total');
insert into tipoPago( nom_tpPago) values('Abono');
insert into tipoPago( nom_tpPago) values('Credito');

#Datos de la forma de pago
insert into formaPago( nom_fmPago) values('Efectivo');
insert into formaPago( nom_fmPago) values('Cheque');
insert into formaPago( nom_fmPago) values('Transaccion san QA');
insert into formaPago( nom_fmPago) values('Transaccion BBVA');
insert into formaPago( nom_fmPago) values('Transaccion san hcr');

#Datos de  los estatus de las ordenes de trabajo
insert into estatusCobranza( nom_estCobranza) values('Pagada');
insert into estatusCobranza( nom_estCobranza) values('Saldo pendiente');
insert into estatusCobranza( nom_estCobranza) values('Cancelada');
insert into estatusCobranza( nom_estCobranza) values('Descuento nomina');

#Datos de los procesos
insert into proceso( nom_proceso) values('Diseño');
insert into proceso(nom_proceso) values('Plotter corte');
insert into proceso( nom_proceso) values('Router CNC');
insert into proceso( nom_proceso) values('Taller');

#Datos de tipo de trabajo
insert into tipotrabajo( nom_tpTrabajo) values('Acabados');
insert into tipotrabajo( nom_tpTrabajo) values('Sin Acabados');
insert into tipotrabajo( nom_tpTrabajo) values('Instalacion');

#Datos de los tipos de venta
insert into tipoVenta(nom_tpVenta) values ('En mostrador');
insert into tipoVenta(nom_tpVenta) values ('Factura');
insert into tipoVenta(nom_tpVenta) values ('Orden interna QA');

#Datos de los tipos de Cliente
insert into tpCliente( nom_tpcliente) values ('Mostrador');
insert into tpCliente(nom_tpcliente) values ('Credito Autorizado');
insert into tpCliente( nom_tpcliente) values ('Trabajador QA');
insert into tpCliente(nom_tpcliente) values ('Orden interna QA');

#Datos de material de Produccion
insert into material_produccion( id_material, id_unidad, medidaMaterial, proveedor) values (2, 1, '0.60X50', 'Proveedor');
insert into material_produccion( id_material, id_unidad, medidaMaterial, proveedor) values (3, 1, '1.22X50', 'Proveedor');

SELECT id_tpMaterial, nom_material, nom_unidad,medidaMaterial, proveedor
FROM material_produccion mp
inner join material m 
inner join unidad u;

SELECT id_producto, nom_clasificacion, nom_subclasificacion, nom_material, nom_unidad, apl_desc, precio_sin, precio_con, observaciones
FROM producto 
inner join clasificacion c
inner join subClasificacion sc
inner join material m
inner join unidad u ;

DELIMITER //

CREATE PROCEDURE obtener_unidades()
BEGIN
    SELECT * FROM unidad;
END //

DELIMITER ;

call obtener_unidades;



