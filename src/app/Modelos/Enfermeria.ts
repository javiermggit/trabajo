import { VMPaciente, Acompañante, RevisionSistema, ExamenFisico, VMDiagnostico, DiagnosticoPrincipal, Ordenamiento, PlanificacionFamiliar, Profesional, Especialidad, Sede, ControlPlanificacionFamiliar, AntecedentePatologicos, VMAntecedente, AntecedenteFamiliar, HCMedicmento, AntecedenteGinecoObstetrico, AdultoHC, OrdenamientoHC } from './Modelos';
import { Cervix } from './Cervix';
import { Vacunacion } from './Vacunacion'
import { Mama } from './Mama';
import { AIAPIS, CrecimientoDesarrollo } from './CrecimientoDesarrollo';
import { AntecedentesGinecoObstetricos, Joven } from './Joven';
import { Pes } from './Pes';
import { Prenatal } from './Prenatal';
import { CitasImpresion } from './Medico';
import { Adolescencia } from './Adolescencia';
import { Nota } from './Nota';
import { epocHc } from './epoc';
//import { pyp } from '../morbilidad/morbilidad.service';

export class HCEnfermeria {
    public citaId: string;
    public profesional: Profesional;
    public especialidad: Especialidad;
    public sede: Sede;

    public datosUsuario: VMPaciente;
    public acompanante: Acompañante;
    public motivo: string;
    public ultimaEnfermedad: string;

    public antecedentePatologicos: AntecedentePatologicos;
    public quirurgicos: VMAntecedente[];
    public traumaticos: VMAntecedente[];
    public transfusiones: VMAntecedente[];
    public alergicos: VMAntecedente[];
    public farmacologicos: VMAntecedente[];
    public antecedenteFamiliar: AntecedenteFamiliar;
    public antecedenteGinecoObstetrico: AntecedenteGinecoObstetrico;
    public revisionSistema: RevisionSistema;
    public examenFisico: ExamenFisico;
    public fechaCreacion: string;
    public analisisYplan: string;
    public diagnosticos: VMDiagnostico[];
    public diagnosticoPrincipal: DiagnosticoPrincipal;

    public listadoOrdenamiento: Array<Ordenamiento>;
    public recomendacionesMedicas: string;

    public esCervix: boolean;
    public observacionCervix: string;
    public cervix: Cervix;

    public esCrecimientoDesarrollo: boolean;
    public primeraInfancia: boolean = false;
	public infancia: boolean = false;
    public observacionCrecimientoDesarrollo: string;
    public crecimientoDesarrollo: CrecimientoDesarrollo;

    public esMama: boolean;
    public observacionMama: string;
    public mama: Mama;

    public esVacunacion: boolean;
    public observacionVacunacion: string;
    public vacunacion: Array<Vacunacion>;

    public esPlanificacionFamiliar: boolean;
    public observacionPlanificacionFamiliar: string;
    public ingresoPlanificacion: PlanificacionFamiliar;

    public esPes: boolean;
    public PESHC: Pes;

    public prenatal: boolean = false;
    public PrenatalHC: Prenatal;

    public esAdulto: boolean = false;
	public esJoven: boolean = false;
	public adolescencia: boolean = false;
	public esVejez:boolean;

	public adolescenciaHC: Adolescencia;
	public adultoHC: AdultoHC;
	public jovenHC: Joven;

    /*  public adolescencia: boolean = false;
     public observacionAdolescencia: string;
     public adolescenciaHC: Adolescencia; */

     public swAiepi: boolean;
     public aiepi: AIAPIS;

     public swEpoc: boolean;
     public epoc: epocHc;

    public swIncapacidad: boolean = false;
    public medicamento: HCMedicmento;
    public Especialidad: Especialidad;

    public swFinalizacionCrecimientoYDesarrollo: boolean = false;
    public swFinalizacionJoven: boolean = false;
    public swFinalizacionAdulto: boolean = false;
    public swFinalizacionPrenatal: boolean = false;
    public swFinalizacionHTA: boolean = false;
    public swFinalizacionDM: boolean = false;
    public swFinalizacionHTADM: boolean = false;
    public swFinalizacionERC12: boolean = false;
    public swFinalizacionERC3AB: boolean = false;
    public swFinalizacionERC4: boolean = false;
    public swFinalizacionERC5: boolean = false;
    public swFinalizacionNefro: boolean = false;

    notaAdministrativa: Array<Nota>;
    citaImpresion: CitasImpresion;
    edadPaciente:number;
    public ordenamientoHC: OrdenamientoHC;
    //listadoPYP: Array<pyp>;
}
