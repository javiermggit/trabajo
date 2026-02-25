import { Incapacidad, Ordenamiento } from 'src/app/Modelos/Modelos';
import { CitasImpresion } from './Medico';
import { Profesional, Especialidad, Sede, VMPaciente, VMHistorico, VMDiagnostico, DiagnosticoPrincipal, HCMedicmento, OrdenamientoHC } from './Modelos';

export class HCProcedimiento {
    public citaId: string | undefined ;
    public profesional: Profesional | undefined ;
    public especialidad: Especialidad | undefined;
    public sede: Sede | undefined;
    public datosUsuario: VMPaciente | undefined;
    public numeroAutorizacion: string | undefined;
    public ListadoOrdenamiento: Array<VMHistorico> | undefined;
    public consentimiento: boolean | undefined;
    public orbservaciones: string | undefined;
    public fechaCreacion: string | undefined;
    public diagnosticos: VMDiagnostico[] | undefined;
    public diagnosticoPrincipal: DiagnosticoPrincipal | undefined;
    public resultadoPruebaRapida: examenPruebaRapida | undefined;

    public medicamento: HCMedicmento | undefined; 
    public ListadoOrdenamientoSolicitados: Array<Ordenamiento> | undefined;
    public recomendacionesMedicas: string  | undefined; //Ya estaba


    public incapacidad: Incapacidad | undefined;
    public swIncapacidad: boolean = false;

    citaImpresion: CitasImpresion | undefined;
    OrdenamientoHC: OrdenamientoHC | undefined;
  NotaAdministrativa: boolean | undefined;

}

export class examenPruebaRapida {
    resultadoVIH: string | undefined;
    fechaResultadoVIH: Date | undefined;
    loteVIH: string | undefined;
    resultadoSifilis: string | undefined;
    fechaResultadoSifilis: Date | undefined;
    loteSifilis: string | undefined;
}
