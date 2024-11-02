########################################
########################################
########################################
# Procedimiento Almacenado 
use prueba2;
#		AGREGAR TIPO DE CLIENTE
DELIMITER //
Create procedure agg_tipoCliente (
    IN p_nom_tpcliente    VARCHAR(20), 
    IN p_desc_tpcliente VARCHAR(100)
)
BEGIN
	insert into tpCliente (  nom_tpcliente  ,  desc_tpcliente ) 
    values( p_nom_tpcliente, p_desc_tpcliente);
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

# DAR DE ALTA CATALOGOS DE PRODUCTOS

#		AGREGAR CLASIFICACION
DELIMITER //
Create procedure agg_clasificacion (
    IN p_nom_clasificacion VARCHAR (40),
	IN p_desc_clasificacion VARCHAR(100)
)
BEGIN
	insert into clasificacion ( nom_clasificacion , desc_clasificacion, alta_clasificacion  ) 
    values( p_nom_clasificacion, p_desc_clasificacion, TRUE);
END //
DELIMITER ;

#	AGREGAR	SUB---CLASIFICACION
DELIMITER //
Create procedure agg_subClasificacion (
    IN p_nom_subclasificacion VARCHAR (80),
	IN p_desc_subclasificacion VARCHAR(100)
)
BEGIN
	insert into subClasificacion ( nom_subclasificacion, desc_subclasificacion, alta_subclasificacion  ) 
    values( p_nom_subclasificacion, p_desc_subclasificacion, TRUE);
END //
DELIMITER ;

#		AGREGAR MATERIAL
DELIMITER //
Create procedure agg_material (
    IN p_nom_material VARCHAR (80),
    IN p_desc_material VARCHAR(100)
)
BEGIN
	insert into material ( nom_material, desc_material , alta_material ) 
    values( p_nom_material, p_desc_material ,TRUE);
END //
DELIMITER ;

#		AGREGAR UNIDAD
DELIMITER //
Create procedure agg_unidad (
    IN p_nom_unidad VARCHAR(10),
    IN p_desc_unidad  VARCHAR(100)
)
BEGIN
	insert into unidad ( nom_unidad, desc_unidad ) 
    values( p_nom_unidad, p_desc_unidad);
END //
DELIMITER ;

#		AGREGAR MATERIAL PARA PRODUCCION
DELIMITER //
Create procedure agg_material_produccion (
    IN p_id_material INT,
	IN p_id_unidad INT,
    IN p_mat_base float4,
    IN p_mat_altura float4,
    IN p_proveedor VARCHAR(30)
)
BEGIN
	insert into material_produccion ( id_material, id_unidad, mat_base, mat_altura, proveedor, alta_mat_prod ) 
    values( p_id_material, p_id_unidad, p_mat_base ,p_mat_altura, p_proveedor, TRUE);
END //
DELIMITER ;



#AGREGAR PRODUCTO   - REGRESA EL ID DEL PRODUCTO
DELIMITER //
create procedure agg_producto (
    IN p_id_clasificacion  INT,
    IN p_id_subclasificacion INT,
    IN p_id_tpMaterial  INT,
	IN p_id_unidad  INT,
    IN p_apl_inst BOOLEAN,
	IN p_precio_sin  float4,
    IN p_precio_con   float4,
	IN p_observaciones varchar(200)
)
BEGIN

	insert into producto  (id_clasificacion , id_subclasificacion , id_tpMaterial , id_unidad , apl_inst , precio_sin , precio_con , observaciones, alta_producto  ) 
    values( p_id_clasificacion, p_id_subclasificacion, p_id_tpMaterial, p_id_unidad,p_apl_inst, p_precio_sin, p_precio_con, p_observaciones, TRUE);
    
END //
DELIMITER ;

#		AGREGAR ACABADO
DELIMITER //
Create procedure agg_acabado (
    IN p_nom_acabado VARCHAR(20),
    IN p_desc_acabado  VARCHAR(100)
)
BEGIN
	insert into acabado ( nom_acabado, desc_acabado, alta_acabado ) 
    values( p_nom_acabado, p_desc_acabado, TRUE);
END //
DELIMITER ;

#		AGREGAR TIPO DE VENTA
DELIMITER //
Create procedure agg_tipoVenta (
    IN p_nom_tpVenta VARCHAR(20),
    IN p_desc_tpVenta   VARCHAR(100)
)
BEGIN
	insert into tipoVenta ( nom_tpVenta, desc_tpVenta, alta_tpVenta  ) 
    values( p_nom_tpVenta, p_desc_tpVenta, TRUE);
END //
DELIMITER ;

#		AGREGAR TIPO DE TRABAJO
DELIMITER //
Create procedure agg_tipoTrabajo (
    IN p_nom_tpTrabajo VARCHAR(20),
    IN p_desc_tpTrabajo    VARCHAR(100)
)
BEGIN
	insert into tipoTrabajo ( nom_tpTrabajo, desc_tpTrabajo, alta_tpTrabajo ) 
    values( p_nom_tpTrabajo, p_desc_tpTrabajo, TRUE);
END //
DELIMITER ;

#		AGREGAR PROCESOS
DELIMITER //
Create procedure agg_proceso (
    IN p_nom_proceso  VARCHAR(20),
	IN p_desc_proceso    VARCHAR(100)
)
BEGIN
	insert into proceso ( nom_proceso , desc_proceso, alta_proceso ) 
    values( p_nom_proceso, p_desc_proceso, TRUE);
END //
DELIMITER ;

#		AGREGAR TIPO DE PAGO
DELIMITER //
Create procedure agg_tipoPago (
    IN p_nom_tpPago  VARCHAR(20),
	IN p_desc_tpPago     VARCHAR(100)
)
BEGIN
	insert into tipoPago (  nom_tpPago,  desc_tpPago, alta_tpPago ) 
    values( p_nom_tpPago ,p_desc_tpPago, TRUE );
END //
DELIMITER ;

#		AGREGAR FORMA DE PAGO
DELIMITER //
Create procedure agg_formaPago (
    IN p_nom_fmPago   VARCHAR(30),
	IN p_desc_fmPago      VARCHAR(100)
)
BEGIN
	insert into formaPago (  nom_fmPago  , desc_fmPago, alta_fmPago    ) 
    values( p_nom_fmPago, p_desc_fmPago, TRUE);
END //
DELIMITER ;


#		AGREGAR ESTATUS DE COBRANZA
DELIMITER //
Create procedure agg_estatusCobranza (
    IN p_nom_estCobranza    VARCHAR(20),
	IN p_desc_estCobranza      VARCHAR(100)
)
BEGIN
	insert into estatusCobranza (  nom_estCobranza  , desc_estCobranza, alta_estCobranza  ) 
    values( p_nom_estCobranza, p_desc_estCobranza, TRUE);
END //
DELIMITER ;


#AGREGAR COTIZACION   -- REGRESA EL ULTIMO ID REGISTRADO PARA PODER LLAMAR A LOS OTROS PROCEDIMIENTOS CON EL
DELIMITER //
create procedure agg_cotizacion (
    IN p_id_cliente  INT,
    IN p_id_tpVenta  INT,
    IN p_subTotal  float8,
	IN p_iva float8,
    IN p_total  float8,
    IN p_fechaVigencia  date,
	IN p_estatus  BOOLEAN,
    IN p_factura  BOOLEAN,
    IN p_personal  VARCHAR(100),
    IN p_observacion  VARCHAR(400),
	IN p_eliminacion  BOOLEAN ## Talvez Quitar

)
BEGIN

	insert into cotizacion (id_cliente , id_tpVenta , subTotal , iva , total , fechaVigencia , estatus , factura , personal , observacion , eliminacion) 
    values( p_id_cliente, p_id_tpVenta, p_subTotal, p_iva,p_total, p_fechaVigencia, p_estatus, p_factura, p_personal, p_observacion, p_eliminacion);

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
    IN P_cantidad INT,
    IN p_prod_base float4,
    IN p_prod_altura float4,
    IN p_precio_Uni  float4,
    IN p_importe float8
)
BEGIN
	insert into prod_cotizacion (  id_cotizacion  ,  id_producto   ,cantidad   ,prod_base , prod_altura ,precio_Uni , importe ) 
    values( p_id_cotizacion, p_id_producto, P_cantidad, p_prod_base, p_prod_altura, p_precio_Uni ,p_importe);
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
    IN p_monto float4 
)
BEGIN
	insert into pagoOrdenTrabajo (  id_ordenTrabajo   ,  id_tpPago     ,id_fmPago , comprobante , fecha_pago , montoPago ) 
    values( p_id_ordenTrabajo, p_id_tpPago, p_id_fmPago , p_comprobante, p_fechaPago, p_monto);
    
    UPDATE ordenTrabajo
	SET totalPagado = (SELECT SUM(montoPago) FROM pagoOrdenTrabajo where id_ordenTrabajo = p_id_ordenTrabajo) where id_ordenTrabajo = p_id_ordenTrabajo;
    
END //
DELIMITER ;


#CALL agg_tipoCliente (nom_tpcliente, desc_tpcliente  );
CALL agg_tipoCliente ("En caja", "El cliente se presento en el mostrador del local"  );
#Call agg_cliente(nom_cliente, apPaterno, apMaterno, const_fiscal, RFC_cliente, nom_negocio, dom_cliente, telWP_cliente, telFJ_cliente, correo_cliente, id_tpCliente, @variable);
Call agg_cliente("Wiliam", "Perez", "V", "C://", "PEVW", "CHAWMEIN", "EMPAQUES 36417, BARRANCOS CL. 80480", 6674859669, 6652874586, "w@GMAIL.COM", 1);

#CALL agg_clasificacion(nom_clasificacion, desc_clasificacion ) 
CALL agg_clasificacion("LONA DE IMPRESION", "Lona de impresion blanca rectangular" ) ;

#CALL agg_subClasificacion(nom_subclasificacion, desc_subclasificacion ) 
CALL agg_subClasificacion("LONA DE IMPRESION", "Lona de impresion blanca rectangular" );

#CALL agg_material (nom_material, desc_material );
CALL agg_material ("LONA DE IMPRESION", "Lona de impresion blanca rectangular" );

#CALL agg_unidad (nom_unidad, desc_unidad );
CALL agg_unidad ("MT", "Metro" );

#CALL agg_material_produccion (id_material, id_unidad, mat_base , mat_altura,  proveedor);
CALL agg_material_produccion (1, 1, 1.6,20.9, "PERSA seguridad industrial");

#CALL agg_producto (id_clasificacion , id_subclasificacion , id_tpMaterial , id_unidad , apl_desc , precio_sin , precio_con , observaciones); // apl_desc es boolean  para saber si aplica descuento o no
CALL agg_producto (2 , 1 , 3 , 3 , FAlSE , 250.99 , 368.99 , "No cuenta con instalacion este producto"); #// apl_desc es boolean  para saber si aplica descuento o no

#CALL agg_acabado (nom_acabado, desc_acabado );
CALL agg_acabado ("OJILLOS", "Decoracion de ojillos para lona" );

#CALL agg_tipoVenta (nom_tpVenta, desc_tpVenta );
CALL agg_tipoVenta ("EN MOSTRADOR", "EL CLIENTE ASISTIO AL LOCAL A REALIAZAR SU COMPRA" );

#CALL agg_tipoTrabajo (nom_tpTrabajo, desc_tpTrabajo );
CALL agg_tipoTrabajo ("SIN INSTALACION", "EL TRABAJO DEL CLIENTE NO REQUIERE O NO SOLICITO INSTALACION" );

#CALL agg_proceso (nom_proceso, desc_proceso );
CALL agg_proceso ("DISEÑO", "EL CLIENTE REQUIERE QUE SE REALICE EL DISEÑO PARA SU PRODUCTO" );

#CALL agg_cotizacion(id_cliente , id_tpVenta , subTotal , iva , total , fechaVigencia , estatus , factura , personal , observacion , eliminacion, @variable) ; ## estatus = False y Eliminacion = False, al iniciar la cotizacion ## Regresa el ultimo id registrado 
CALL agg_cotizacion(1 , 3 , 369.5 , 200 , 589.5 , "2022-01-10" , false , false , "Veronica Palazuelos" , "El cliente solicito un diseño para el logo y el fondo del folleto " , false) ;

#CALL agg_acab_cotizacion( id_cotizacion  ,  id_acabado);
CALL agg_acab_cotizacion( 1  ,  1);
CALL agg_acab_cotizacion( 1  ,  2);

#CALL agg_trab_cotizacion( id_cotizacion  ,  id_tpTrabajo );
CALL agg_trab_cotizacion( 1  ,  3 );
CALL agg_trab_cotizacion( 1  ,  2 );

#CALL agg_proc_cotizacion(  id_cotizacion  ,  id_proceso);
cALL agg_proc_cotizacion(  1  ,  3);
CALL agg_proc_cotizacion(  1  ,  3);

#CALL agg_product_cotizacion( id_cotizacion  ,  id_producto   ,cantidad,  prod_base, prod_altura, precio_Uni , importe  );
CALL agg_product_cotizacion( 1  ,  1   ,10,  20, 30, 50 , 509  );
CALL agg_product_cotizacion( 1  ,  1   ,5,  2.50, 3.5, 30 , 596.56  );
CALL agg_product_cotizacion( 1  ,  1   ,2,  36.2, 2.5, 25.99 , 5600.69  );

#CALL agg_estatusCobranza (nom_estCobranza , desc_estCobranza  );
CALL agg_estatusCobranza ("CANCELADA", "EL CLIENTE SOLICITO CANCELAR LA ORDEN DE TRABAJO "  );

#CALL agg_tipoPago (nom_tpPago , desc_tpPago  );
CALL agg_tipoPago ("ABONO", "EL CLIENTE REALIZA UN PAGO DE SU ORDEN DE TRABAJO" );

#CALL agg_formaPago (nom_fmPago , desc_fmPago );
CALL agg_formaPago ("PAGO A LA CUENTA DE BBVA QA", "REALIZO EL PAGO A LA CUENTA BANCARIA BBVA 589641256325 DE LA EMPRESA QUALITYART" );

#CALL agg_ordenTrabajo(  id_cotizacion  ,  id_estCobranza    ,totalPagado);
CALL agg_ordenTrabajo(  1  ,  1    ,0);

#CALL agg_pagoOrdenTrabajo(  id_ordenTrabajo   ,  id_tpPago     ,id_fmPago , comprobante , fecha_pago , montoPago);
CALL agg_pagoOrdenTrabajo(  1   ,  1     ,1 , "" , "2024-12-30" , 250.6);
CALL agg_pagoOrdenTrabajo(  1   ,  2     ,1 , "" , "2024-12-30" ,  130.5);
