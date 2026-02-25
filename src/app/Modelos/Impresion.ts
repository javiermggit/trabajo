export class ImpresionHC {


    constructor() {
        this.medicamentos = new Array<MedicamentoPrint>();
        this.Incapacidad = new Incapacidad;
        this.CertificadoAislamiento = new Incapacidad;
        this.CertificadoReintegro = new Incapacidad;
        this.Ordenamiento = new Incapacidad;
        this.resultadoCitas = [
          {
              "radicado": null,
              "fecha": "03/05/2024 0:00:00",
              "hora": "10:30AM",
              "sede": "VIVA 1A IPS CARRERA 80",
              "direccion": "CARRERA 80 # 6 - 71",
              "paciente": "ZULEIMA  QUINTERO",
              "especialidad": "MEDICINA GENERAL",
              "medico": "JULIAN ANDRES  RAMIREZ",
              "error": false,
              "errorMensaje": null
          },
          {
              "radicado": null,
              "fecha": null,
              "hora": null,
              "sede": null,
              "direccion": null,
              "paciente": null,
              "especialidad": null,
              "medico": null,
              "error": true,
              "errorMensaje": "Para la orden <strong>CONSULTA DE CONTROL O DE SEGUIMIENTO POR ODONTOLOGÍA GENERAL</strong> no se ha podido asignar cita por los siguientes motivos:<br>  <span class='text-red font-bold'>No se encontraron agendas</span>"
          },
          {
              "radicado": null,
              "fecha": null,
              "hora": null,
              "sede": null,
              "direccion": null,
              "paciente": null,
              "especialidad": null,
              "medico": null,
              "error": true,
              "errorMensaje": "Para la orden <strong>CONSULTA DE CONTROL O DE SEGUIMIENTO POR ENFERMERÍA</strong> no se ha podido asignar cita por los siguientes motivos:<br>  <span class='text-red font-bold'>No se encontraron agendas</span>"
          },
          {
              "radicado": null,
              "fecha": null,
              "hora": null,
              "sede": null,
              "direccion": null,
              "paciente": null,
              "especialidad": null,
              "medico": null,
              "error": true,
              "errorMensaje": "Para la orden <strong>CONSULTA DE PRIMERA VEZ POR ODONTOLOGÍA GENERAL</strong> no se ha podido asignar cita por los siguientes motivos:<br>  <span class='text-red font-bold'>No se encontraron agendas</span>"
          },
          {
              "radicado": null,
              "fecha": null,
              "hora": null,
              "sede": null,
              "direccion": null,
              "paciente": null,
              "especialidad": null,
              "medico": null,
              "error": true,
              "errorMensaje": "Para la orden <strong>CONSULTA DE PRIMERA VEZ POR ENFERMERÍA</strong> no se ha podido asignar cita por los siguientes motivos:<br>  <span class='text-red font-bold'>No se encontraron agendas</span>"
          },
          {
              "radicado": null,
              "fecha": null,
              "hora": null,
              "sede": null,
              "direccion": null,
              "paciente": null,
              "especialidad": null,
              "medico": null,
              "error": true,
              "errorMensaje": "Para la orden <strong>CONSULTA DE PRIMERA VEZ POR MEDICINA GENERAL</strong> no se ha podido asignar cita por los siguientes motivos :<br> <span class='text-red font-bold'> - El Paciente ya registra una cita con esta especialidad</span>"
          }
        ]
    }

    // public ordenes:Array<item>;
    // public solicitudesI:Array<item>;
    // public solicitudesE:Array<item>;
    public UrlBase: string;

    public medicamentos: Array<MedicamentoPrint>;
    public Incapacidad: Incapacidad;
    public CertificadoAislamiento: Incapacidad;
    public CertificadoReintegro: Incapacidad;
    public Ordenamiento: Ordenamiento;

    public CitaId: string;
    public PacienteId: number;
    public PadreId: string;
    public Agrupador: string;
    public AgrupadorMedicamento: string;

    public resultadoCitas: Array<CitaDetalles>
    //public EspecialidadId:string;

   /*  public generarUrlMedicamento(mes: number) {
        return this.UrlBase + "/reportepdf/GenerarMedicamento?MedicamentoId=" + this.CitaId + "&PadreId=" + this.PadreId + "&N=" + mes; //+ "&Esp=" + this.EspecialidadId
    }
    public generarUrlIncapacidad() {
        return this.UrlBase + "/reportepdf/GenerarIncapacidad?IncapacidadId=" + this.CitaId + "&PadreId=" + this.PadreId; // + "&Esp=" + this.EspecialidadId;
    }
    public generarUrlOrdenamiento(indentificacion: number) {
        return this.UrlBase + "/reportepdf/GenerarOrdenHC?Agrupador=" + this.Agrupador + "&idPaciente=" + indentificacion;
    } */
}

// export class item{
//     public titulo : string;
//     public descripcion:string;
//     public Url: string;
// }

export class CitaDetalles {
  public radicado: string = "";
  public fecha: string = "";
  public hora: string = "";
  public sede: string = "";
  public direccion: string = "";
  public paciente: string = "";
  public medico: string = "";
  public especialidad : string = "";

  public error: boolean = false;
  public errorMensaje: string = "";
}

export class Ordenamiento {
    public url: string = "";
}

export class MedicamentoPrint {
    public mes: number = 1;
    public url: string = "";
}


export class Incapacidad {
    public url: string = "";

}
