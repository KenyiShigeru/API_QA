
#  CONSULTAR TABLAS 
use prueba2;
# 		CLASIFICACION
DELIMITER //
Create procedure consulta_clasificacion (
    IN nombre varchar(20)
)
BEGIN

	Select id_clasificacion, nom_clasificacion , desc_clasificacion, alta_clasificacion   from clasificacion where nom_clasificacion like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		SUB--CLASIFICACION
DELIMITER //                   
Create procedure consulta_subclasificacion (
    IN nombre varchar(20)
)
BEGIN

	Select id_subclasificacion , nom_subclasificacion, desc_subclasificacion, alta_subclasificacion   from subClasificacion where nom_subclasificacion  like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		MATERIAL
DELIMITER //
Create procedure consulta_material (
    IN nombre varchar(20)
)
BEGIN

	Select id_material  , nom_material, desc_material, alta_material   from material  where nom_material   like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		UNIDAD
DELIMITER //
Create procedure consulta_unidad (
    IN nombre varchar(20)
)
BEGIN

	Select id_unidad   , nom_unidad ,desc_unidad    from unidad   where nom_unidad    like  CONCAT('%', nombre, '%');
END //
DELIMITER ;


# 		MATERIAL -- PRODUCCION
DELIMITER //
Create procedure consulta_material_produccion (
    IN nombre varchar(20)
)
BEGIN

	Select id_tpMaterial, nom_material , nom_unidad, mat_base , mat_altura, proveedor , alta_mat_prod 
    from material_produccion  mp
    inner join material m on m.id_material = mp.id_material
    inner join unidad u on u.id_unidad = mp.id_unidad
    where nom_material  like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		producto
DELIMITER //
Create procedure consulta_producto (
    IN nombre varchar(20)
)
BEGIN

	Select id_producto , c.nom_clasificacion  , subc.nom_subclasificacion , m.nom_material , u.nom_unidad ,apl_inst  , precio_sin ,  precio_con , observaciones , alta_producto 
    from producto p
    inner join clasificacion c on c.id_clasificacion = p.id_clasificacion
    inner join subclasificacion subc on subc.id_subclasificacion  = p.id_subclasificacion 
    inner join unidad u on u.id_unidad = p.id_unidad
    inner join material_produccion mp on mp.id_tpMaterial = p.id_tpMaterial 
    inner join material m on m.id_material = mp.id_material 
    where m.nom_material  like  CONCAT('%', nombre, '%') or
    c.nom_clasificacion like  CONCAT('%', nombre, '%') or
    subc.nom_subclasificacion like  CONCAT('%', nombre, '%') ;
    
END //
DELIMITER ;

# 		TIPO DE CLIENTE
DELIMITER //
Create procedure consulta_tpCliente (
    IN nombre varchar(20)
)
BEGIN

	Select id_tpCliente ,nom_tpcliente ,desc_tpcliente 
    FROM tpCliente
    where nom_tpcliente  like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		CLIENTE
DELIMITER //
Create procedure consulta_cliente (
    IN nombre varchar(20)
)
BEGIN

	Select id_cliente ,concat(nom_cliente ," ", apPaterno ," ",apMaterno ) AS "Nombre Completo", tpc.nom_tpcliente,const_fiscal ,  RFC_cliente , nom_negocio , dom_cliente , telWP_cliente ,  telFJ_cliente , correo_cliente 
    FROM cliente c
    inner join tpCliente tpc on tpc.id_tpCliente = c.id_tpCliente 
    where concat(nom_cliente ," ", apPaterno ," ",apMaterno )   like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		ESTADOS DE CLIENTE
DELIMITER //
Create procedure consulta_estadoCliente (
    IN nombre varchar(20)
)
BEGIN

	Select c.id_cliente ,concat(nom_cliente ," ", apPaterno ," ",apMaterno ) AS "Nombre Completo", nom_negocio , dom_cliente , telWP_cliente ,  ec.adeudo 
    FROM cliente c
    inner join estadoCliente ec on ec.id_cliente= c.id_cliente
    where concat(nom_cliente ," ", apPaterno ," ",apMaterno )   like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		ACABADO
DELIMITER //
Create procedure consulta_acabado (
    IN nombre varchar(20)
)
BEGIN

	Select id_acabado   , nom_acabado ,desc_acabado ,alta_acabado 
    from acabado  
    where nom_acabado    like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		TIPO DE VENTA
DELIMITER //
Create procedure consulta_tipoVenta (
    IN nombre varchar(20)
)
BEGIN

	Select id_tpVenta , nom_tpVenta ,desc_tpVenta  ,alta_tpVenta 
    from tipoVenta  
    where nom_tpVenta     like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		TIPO DE TRABAJO
DELIMITER //
Create procedure consulta_tipoTrabajo (
    IN nombre varchar(20)
)
BEGIN

	Select id_tpTrabajo, nom_tpTrabajo ,  desc_tpTrabajo, alta_tpTrabajo 
    from tipoTrabajo  
    where nom_tpTrabajo like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		PROCESOS
DELIMITER //
Create procedure consulta_proceso (
    IN nombre varchar(20)
)
BEGIN

	Select id_proceso  , nom_proceso,  desc_proceso, alta_proceso 
    from proceso   
    where nom_proceso like  CONCAT('%', nombre, '%');
END //
DELIMITER ;


# 		TIPO DE PAGO
DELIMITER //
Create procedure consulta_tipoPago (
    IN nombre varchar(20)
)
BEGIN

	Select id_tpPago , nom_tpPago, desc_tpPago, alta_tpPago 
    from tipoPago    
    where nom_tpPago like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		FORMA  DE PAGO
DELIMITER //
Create procedure consulta_formaPago (
    IN nombre varchar(20)
)
BEGIN

	Select id_fmPago , nom_fmPago, desc_fmPago, alta_fmPago 
    from formaPago  
    where nom_fmPago like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

CALL consulta_estatusCobranza("")

# 		FORMA  DE PAGO
DELIMITER //
Create procedure consulta_estatusCobranza (
    IN nombre varchar(20)
)
BEGIN

	Select id_estCobranza , nom_estCobranza ,  desc_estCobranza ,alta_estCobranza  
    from estatusCobranza   
    where nom_estCobranza   like  CONCAT('%', nombre, '%');
END //
DELIMITER ;


# 		COTIZACION
DELIMITER //
Create procedure consulta_cotizacion (
    IN nombre varchar(20)
)
BEGIN

	Select c.id_cotizacion, concat(nom_cliente ," ", apPaterno ," ",apMaterno ) AS "Nombre Completo",  tpv.nom_tpVenta, c.total, c.fechaVigencia, c.estatus, c.factura, c.personal, c.observacion
    from cotizacion c
    inner join tipoVenta tpv on tpv.id_tpVenta = c.id_tpVenta
    inner join cliente cl on cl.id_cliente = c.id_cliente
    where "Nombre Completo"         
    like  CONCAT('%', nombre, '%') or cl.nom_negocio  like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		ACABADOS  POR  COTIZACION
DELIMITER //
Create procedure consulta_acab_cotizacion (
    IN ID INT
)
BEGIN

	Select ac.id_cotizacion,  a.id_acabado ,a.nom_acabado, a.desc_acabado 
    from acab_cotizacion ac
    inner join cotizacion c on ac.id_cotizacion = c.id_cotizacion
    inner join acabado a on ac.id_acabado = a.id_acabado 
    where ac.id_cotizacion = ID;
END //
DELIMITER ;

# 		TRABAJOS  POR  COTIZACION
DELIMITER //
Create procedure consulta_trab_cotizacion (
    IN ID INT
)
BEGIN

	Select tc.id_cotizacion,  tpt.id_tpTrabajo  ,tpt.nom_tpTrabajo , tpt.desc_tpTrabajo 
    from trab_cotizacion tc
    inner join cotizacion c on tc.id_cotizacion = c.id_cotizacion
    inner join tipoTrabajo tpt on tc.id_tpTrabajo  = tpt.id_tpTrabajo 
    where tc.id_cotizacion = ID;
END //
DELIMITER ;

# 		PROCESOS  POR  COTIZACION
DELIMITER //
Create procedure consulta_proc_cotizacion (
    IN ID INT
)
BEGIN

	Select pc.id_cotizacion,  p.id_proceso   ,p.nom_proceso  , p.desc_proceso 
    from proc_cotizacion pc
    inner join cotizacion c on pc.id_cotizacion = c.id_cotizacion
    inner join proceso p on pc.id_proceso  = p.id_proceso 
    where pc.id_cotizacion = ID;
END //
DELIMITER ;


# 		PRODUCTOS  POR  COTIZACION
DELIMITER //
Create procedure consulta_productos_cotizacion (
    IN ID INT
)
BEGIN
	Select pc.id_cotizacion,  pc.id_producto,  pc.cantidad, CONCAT(sc.nom_subclasificacion , " -- ", m.nom_material) as "Descripcion", pc.prod_base, pc.prod_altura, pc.precio_Uni, pc.importe
    from prod_cotizacion pc
    inner join cotizacion c on pc.id_cotizacion = c.id_cotizacion
    inner join producto p on p.id_producto= pc.id_producto
    inner join material_produccion mp on mp.id_tpMaterial = p.id_tpMaterial
    inner join material m on m.id_material = mp.id_material
    inner join subClasificacion sc on sc.id_subclasificacion =p.id_subclasificacion
    where pc.id_cotizacion = ID;
END //
DELIMITER ;

# 		ORDEN	DE	TRABAJO
DELIMITER //
Create procedure consulta_ordenTrabajo(
    IN nombre varchar(100)
)
BEGIN

	Select ot.id_ordenTrabajo, concat(nom_cliente ," ", apPaterno ," ",apMaterno ) AS "Nombre Completo", nom_estCobranza, c.total as "Total Venta", totalPagado
    from ordenTrabajo ot
    inner join cotizacion c on c.id_cotizacion = ot.id_cotizacion
    inner join cliente cl on cl.id_cliente =c.id_cliente
    inner join estatusCobranza ec on ec.id_estCobranza = ot.id_estCobranza
	where "Nombre Completo"         
    like  CONCAT('%', nombre, '%') or cl.nom_negocio  like  CONCAT('%', nombre, '%');
END //
DELIMITER ;

# 		PAGO	ORDEN	DE	TRABAJO
DELIMITER //
Create procedure consulta_pagoOrdenTrabajo(
    IN ID INT
)
BEGIN

	Select pot.id_ordenTrabajo, pot.id_pagoOrdenTrabajo, nom_tpPago , nom_fmPago ,fecha_pago, montoPago,comprobante
    from pagoOrdenTrabajo pot
    inner join ordenTrabajo ot on ot.id_ordenTrabajo = pot.id_ordenTrabajo
    inner join tipoPago tp on tp.id_tpPago  = pot.id_tpPago 
    inner join formaPago fp on fp.id_fmPago  = pot.id_fmPago 
    where pot.id_ordenTrabajo = ID;
END //
DELIMITER ;

CALL consulta_clasificacion("");
CALL consulta_subclasificacion("");
CALL consulta_material("");
CALL consulta_unidad("");
CALL consulta_material_produccion("");  #// nombre  del material

CALL consulta_producto(""); #//nombre del material, clasificacion o subclasificacion

CALL consulta_tpCliente("");
CALL consulta_cliente("");
CALL consulta_estadoCliente("");


CALL consulta_acabado("");
CALL consulta_tipoVenta("");
CALL consulta_tipoTrabajo("");
CALL consulta_proceso("");
CALL consulta_tipoPago("");
CALL consulta_formaPago("");
CALL consulta_estatusCobranza("");

CALL consulta_cotizacion("CHAW");
CALL consulta_acab_cotizacion(1);
CALL consulta_trab_cotizacion(1);
CALL consulta_proc_cotizacion(1);
CALL consulta_productos_cotizacion(1);

CALL consulta_ordenTrabajo("CHAW");
CALL consulta_pagoOrdenTrabajo(1);

SELECT ec.id_cliente, nom_cliente, (ot.totalPagado - c.total)
from estadoCliente ec
inner join cliente cl on cl.id_cliente = ec.id_cliente
inner join cotizacion c on c.id_cliente = ec.id_cliente
inner join ordenTrabajo ot on ot.id_cotizacion = c.id_cotizacion;

SELECT ec.id_cliente , nom_cliente, adeudo
FROM estadoCliente ec
inner join Cliente c on ec.id_cliente = c.id_cliente;
