#	MODIFICAR INFORMACION DE CAALOGOS
use prueba2;
#		MODIFICAR TIPO DE CLIENTE
DELIMITER //
Create procedure modificar_tpclientes (
	IN p_id_tpCliente INT,
    IN p_nom_tpcliente  VARCHAR(20), 
    IN p_desc_tpcliente VARCHAR(100)
)
BEGIN
	UPDATE tpCliente
    SET nom_tpcliente = p_nom_tpcliente, 
        desc_tpcliente  =p_desc_tpcliente
        WHERE id_tpCliente = p_id_tpCliente;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ;

#MODIFICAR CLIENTE  

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


#		MODIFICAR CLASIFICACION
DELIMITER //
create procedure modificar_clasificaciones(
	IN p_id int, 
	IN p_Nuevonombre varchar(40),
	IN p_descripcion varchar(100),
    IN p_alta boolean
)
BEGIN
	UPDATE clasificacion
    SET nom_clasificacion = p_Nuevonombre,
        desc_clasificacion  = p_descripcion ,
        alta_clasificacion = p_alta
        WHERE id_clasificacion  = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ;
#	MODIFICAR	SUB---CLASIFICACION

DELIMITER //
create procedure modificar_subclasificaciones(
	IN p_id int, 
	IN p_Nuevonombre varchar(40),
	IN  p_descripcion varchar(100),
    IN p_alta boolean    
)
BEGIN
	UPDATE subclasificacion
    SET nom_subclasificacion  = p_Nuevonombre,
        desc_subclasificacion  = p_descripcion,
        alta_subclasificacion = p_alta
        WHERE id_subclasificacion  = p_id;  
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
create procedure modificar_material(
	IN p_id int, 
	IN p_Nuevonombre varchar(40),
	IN p_descripcion varchar(100),
	IN p_alta boolean  
)
BEGIN
	UPDATE material
    SET nom_material = p_Nuevonombre,
        desc_material  = p_descripcion,
        alta_material = p_alta
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
create procedure mod_unidad(
	IN p_id int, 
	IN p_Nuevonombre varchar(40),
	IN p_descripcion varchar(100)
)
BEGIN
	UPDATE unidad
    SET nom_unidad = p_Nuevonombre,
        desc_unidad  = p_descripcion  
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
create procedure mod_mat_prod(
	IN p_id int, 
    IN p_id_material INT,
	IN p_id_unidad INT,
    IN p_mat_base  float4,
	IN p_mat_altura   float4,
    IN p_proveedor VARCHAR(30),
	IN p_alta boolean  
)
BEGIN
	UPDATE material_produccion
    SET id_material = p_id_material,
		id_unidad = p_id_unidad,
        mat_base  = p_mat_base  ,
        mat_altura = p_mat_altura,
        proveedor = p_proveedor,
        alta_mat_prod = p_alta
        WHERE id_tpMaterial  = p_id;  
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
create procedure modificar_producto(
	IN p_id int, 
    IN p_id_clasificacion  INT,
	IN p_id_subclasificacion  INT,
	IN p_id_tpMaterial   INT,
	IN p_id_unidad   INT,
    IN p_apl_inst   boolean,
	IN p_precio_sin    float4,
	IN p_precio_con     float4,
    IN p_observaciones  VARCHAR(150),
    IN p_alta BOOLEAN
)
BEGIN
	UPDATE producto 
    SET id_clasificacion  = p_id_clasificacion,
		id_subclasificacion  = p_id_subclasificacion,
        id_tpMaterial   = p_id_tpMaterial  ,
        id_unidad  = p_id_unidad,
        apl_inst  = p_apl_inst,
		precio_sin   = p_precio_sin  ,
        precio_con  = p_precio_con,
        observaciones  = p_observaciones,
        alta_producto = p_alta
        WHERE id_producto   = p_id;  
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
create procedure modificar_acabado(
	IN p_id int, 
	IN p_Nuevonombre varchar(40),
	IN p_descripcion varchar(100),
	IN p_alta BOOLEAN
)
BEGIN
	UPDATE acabado
    SET nom_acabado  = p_Nuevonombre,
        desc_acabado   = p_descripcion  ,
        alta_acabado = p_alta
        WHERE id_acabado  = p_id;  
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
create procedure modificar_tipoVenta(
	IN p_id int, 
	IN p_Nuevonombre varchar(40),
	IN p_descripcion varchar(100),
	IN p_alta BOOLEAN
)
BEGIN
	UPDATE tipoVenta
    SET nom_tpVenta = p_Nuevonombre,
        desc_tpVenta  = p_descripcion,
        alta_tpVenta = p_alta
        WHERE id_tpVenta  = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ; 


#		AGREGAR TIPO DE TRABAJO
DELIMITER //
create procedure modificar_tipoTrabajo(
	IN 	p_id int, 
	IN p_Nuevonombre varchar(40),
	IN p_descripcion varchar(100),
	IN p_alta BOOLEAN
)
BEGIN
	UPDATE tipoTrabajo
    SET nom_tpTrabajo = p_Nuevonombre,
        desc_tpTrabajo = p_descripcion,
        alta_tpTrabajo = p_alta
        WHERE id_tpTrabajo  = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ; 

#		AGREGAR PROCESOS
DELIMITER //
create procedure modificar_proceso(
	IN p_id int, 
	IN p_Nuevonombre varchar(40),
	IN p_descripcion varchar(100),
	IN p_alta BOOLEAN
)
BEGIN
	UPDATE proceso
    SET nom_proceso  = p_Nuevonombre,
        desc_proceso = p_descripcion ,
        alta_proceso = p_alta
        WHERE id_proceso  = p_id;  
    -- Opcional: Verifica si se actualizó algún registro
    IF ROW_COUNT() = 0 THEN
        SELECT 'No se encontró la clasificación con el ID proporcionado.' AS mensaje;
    ELSE
        SELECT 'Clasificación actualizada correctamente.' AS mensaje;
    END IF;
END //
DELIMITER ; 

#		AGREGAR TIPO DE PAGO
DELIMITER //
create procedure modificar_tipoPago(
	IN p_id int, 
	IN p_Nuevonombre varchar(40),
	IN p_descripcion varchar(100),
	IN p_alta BOOLEAN
)
BEGIN
	UPDATE tipoPago
    SET nom_tpPago = p_Nuevonombre,
        desc_tpPago   = p_descripcion,
        alta_tpPago  = p_alta
        WHERE id_tpPago   = p_id;  
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
create procedure modificar_formaPago(
	IN p_id int, 
	IN p_Nuevonombre varchar(40),
	IN p_descripcion varchar(100),
	IN p_alta BOOLEAN
)
BEGIN
	UPDATE formaPago
    SET nom_fmPago = p_Nuevonombre,
        desc_fmPago   = p_descripcion  ,
        alta_fmPago =p_alta
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
create procedure modificar_estCobranza(
	IN p_id int, 
	IN p_Nuevonombre varchar(40),
	IN p_descripcion varchar(100),
	IN p_alta BOOLEAN
)
BEGIN
	UPDATE estatusCobranza
    SET nom_estCobranza  = p_Nuevonombre,
        desc_estCobranza  = p_descripcion,
        alta_estCobranza = p_alta
        WHERE id_estCobranza         = p_id;  
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

