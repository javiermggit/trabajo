
export class RedPrestador {
    id: number = 0;
    codigo: string = '';
    nombre: string;
    nit: string;
    sgsss: string = '';
    ciudad_Id: number;
    direccion: string;
    telefono: string;
    celular: string;
    cedRepresentanteLegal: string = '';
    nombreRepresentante: string = '';
    tarifa: string = '0';
    valor: number;
    fechaCreacion: string;
    estado: string
    usuarioCreacion_Id: number;
    usuarioActualizacion_Id: number;
    ipCreacion: String;
    ipActualizacion: String;


    ciudad: any;

    constructor() {
        this.ciudad_Id = 0;
    }
}
