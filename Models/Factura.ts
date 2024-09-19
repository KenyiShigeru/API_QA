class Factura{
    private nombre_cliente:string;
    private rfc:string;
    private cedula_fiscal:string;

    //Casos bases de constructores
    constructor();
    constructor(nombre_cliente:string);
    constructor(rfc:string);
    constructor(cedula_fiscal:string);
    constructor(nombre_cliente:string,rfc:string);
    constructor(nombre_cliente:string,cedula_fiscal:string);
    constructor(rfc:string,cedula_fiscal:string);
    constructor(nombre_cliente:string,rfc:string, cedula_fiscal:string);

    //Definición del constructor con las posibles implementaciones
    constructor(nombre_cliente?:string, rfc?:string, cedula_fiscal?:string){
        this.cedula_fiscal = cedula_fiscal ?? '';
        this.nombre_cliente =  nombre_cliente ?? '';
        this.rfc =  rfc ?? '';
    }

    get NombreCliente():string{
        return this.nombre_cliente;
    }

    set NombreCliente(nombre_cliente:string){
        this.NombreCliente = nombre_cliente;
    }

    get CedulaFiscal():string
    {
        return this.CedulaFiscal;
    }

    set CedulaFiscal(cedula_fiscal:string)
    {
        this.CedulaFiscal = cedula_fiscal;
    }

    get RegistroFederalCon():string
    
    {
        return this.rfc;
    }

    set RegistroFederalCon(rfc:string)
    {
        this.rfc = rfc;
    }
}