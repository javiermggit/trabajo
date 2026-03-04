import { Prenatal } from './Prenatal';
import { Vacunacion } from './Vacunacion';

import { Paraclinicos, TamisajesDeValoracion, EvolucionMedicaDiagnostica, PlanDeManejo, FactoresDeRiesgoBiologico, IndiceBarthel, TestLindaFried, TestMinimental } from './Adulto';
import { AntecedentesAndrologicos, AntecedentesGinecoObstetricos, FactoresDeriesgoParaOrigenDiabetes, FactoresDeRiesgoPsicosocial, Joven } from './Joven';
import { Mama } from './Mama';
import { AIAPIS, CrecimientoDesarrollo } from './CrecimientoDesarrollo';
import { EPOC, Pes } from './Pes';
import { Cervix } from './Cervix';
import { SaludMental } from './SaludMental';
import { CitasImpresion } from './Medico';
import { Adolescencia, BaseList, BaseListTamizajeMental, Ecomapa, Familiograma, Antecedentes as AntAdo, Sexualidad, TamizajeSaludBucal } from './Adolescencia';
import { Nota } from './Nota';
import { TestPostCovid } from './TestPostCovid';

import { PacMarcacionParentescoNeps } from './PacMarcacionParentescoNeps';
import { PacMarcacionDiscapacidadNeps } from './PacMarcacionDiscapacidadNeps';
import { epocHc } from './epoc';
import { ResultadoAnnar, ResultadoLaboratorioAnnar, VMFechaResultadoOrdenamiento } from './LaboratorioAnnar';
import { GruposOrdenPropiosCx, GruposOrdenRedCx, OrdenRedCx } from './Quirofano';
//import { pyp } from '../morbilidad/morbilidad.service';
export class VMAntecedente {
	public descripcion: string;
	public observacion: string;
	public fecha: any;
	public anio: string;
	public esEliminable: boolean = false;
}

export class VMCup {
	public valor: number;

	public cupAgregar: boolean = false;
	public swCirugia: boolean = false;
	public observacion: string;
	public id: number;
	public codigo: string;
	public descripcion: string;
	public grupo: string;
	public nota_Tecnica: string;
	public estado: string;
	public nivel: number;
	public cantidad: number = 1;
	public resolucion_Id: number;
	public descripcionBusqueda: string

}


export class VMDiagnostico {
	public id: number;
	public dx: boolean = false;
	public dX1: boolean;
	public dX2: boolean;
	public dX3: boolean;
	public codigo: string;
	public simbolo: string;
	public nombre: string;
	public descripcion: string;
	public sexo: string;
	public limiteinferior: number;
	public limiteSuperior: number;
	public noSonAfeccionPrincipal: string;
	public observaciones: string;
	public diasIncapacidad: number;
	public swCertAislamiento: boolean = false;
	public swCertReintegro: boolean = false;
}

export class VMDiagnosticoOdontologico {
	public id: number;
	public dx: boolean = false;
	public dX1: boolean;
	public dX2: boolean;
	public dX3: boolean;
	public diente: number;
	public cara: number;
	public evento: string;
	public codigo: string;
	public simbolo: string;
	public nombre: string;
	public descripcion: string;
	public sexo: string;
	public limiteinferior: number;
	public limiteSuperior: number;
	public noSonAfeccionPrincipal: string;
	public observaciones: string;
	public diasIncapacidad: number;
	public odontograma: boolean;
}


export class VMMedicamento {
	public id: number;
	public codigo: string;
	public nombre: string;
	public descripcion: string;
	public nombreBusqueda: string;
	public valor: number;
	public codServicio: string;
	public codigoInterno: string;
	public esInsumo: boolean;
	public puntoAtencion: string;
}


export interface Encabezado {
	Eps: number;
	IdAfiliado: number;
	TipoId: number;
}

export interface Medicamento {
	codigoInterno: string;
	codigoCUM: string;
	codServicio: string;
	puntoAtencion: string;
	descPunto: string;
	excluido: string;
	cium: string;
	principioActivo: string;
	nombreComercial: string;
	indComercialGenenerico: string;
	esInsumo: boolean;
}

export interface Respuesta {
	Mensaje: string;
	TipoMensaje: string;
}

export interface ConsultaMedicamentosSASOut {
	//Encabezado: Encabezado[];
	medicamento: Medicamento[];
	//Respuesta: Respuesta[];
}

export interface RootObject {
	consultaMedicamentosSASOut: ConsultaMedicamentosSASOut;
}

export interface programasPaciente {
	id: number;
	descripcion: string;
}
export class VMPaciente {

	constructor() {
		this.nombre
		this.eps = new Eps();
    this.programasPaciente = [];
	}
	public edadAnos: number;
	public edadMeses: number;
	public edadSemanas: number;
	public edadDias: number;
	public rangoEdad: number;

	public id: number;
	public primer_Apellido: string;
	public segundo_Apellido: string;
	public nombre: string;
	public nombreCompleto: string;
	public tipo_Identificacion: string;
	public identificacion: string;
	public fecha_Nacimiento: any;
	public edad: number;
	public sexo: string;
	public genero_Id: number;
	public genero: string;
	public orientacion_Id: number;
	public orientacion: any;
	public estadoCivil_Id: number;
	public estadoCivil: string;
	public municipioResidenciad_Id: number;
	public municipioResidenciad: string;
	public direccion: string;
	public telefono: string;
	public celular: string;
	public correo: string;
	public escolaridad_Id: number;
	public escolaridad: any;
	public ocupacion: any;
	public ocupacion_Id: number;
	public eps: Eps;
  public programasPaciente: programasPaciente[];
	public religion_Id: number;
	public religion: any;
	public etnia_Id: number;
	public etnia: string;
	public grupoPoblacional_Id: number;
	public desplazado: boolean = false;
	public familiasAccion: boolean = false;
	public tipoPlan: string;
	public regimen: string;
	public rango: string;
	public estado: string;
	public cuotaMod: number;
	public exentoPago: boolean = false;
	public municipioNacimiento_Id: number;
	public municipioNacimiento: string;
	public estrato_Id: number;
	public estrato: string;
	public discapacidad_Id: number;
	public discapacidad: string;
	public salario: string;
	public sedes: any[];
	public programaCompensar: string;
	public sistemaCuerpoH: Array<string> = new Array<string>();
	public tipoPostCovid: string;
	public riesgo_Segmentacion: string;
	public riesgo_Enfermedad: string;
	public riesgo_Atencion: string;
	public listParentesco: Array<PacMarcacionParentescoNeps>;
	public cohorte: string;
	public discapacidadNeps: PacMarcacionDiscapacidadNeps;
}


export class vmCitaOdontologia {
	fechaAplicacion: Date;
	diferenciaMeses: number;
}


export class Dashboard {
	public id: number;
	public etiqueta: string;
	public leyenda: string;
	public link: string;
	public clase: string;
	public padre_id: number;
	public orden: number;
	public estado: string;
	public fechaCreacion: any;
}
export class Dashboard_Perfil {
	public id: number;
	public dashboard_Id: number;
	public perfil_Id: number;
	public fechaCreacion: any;
	public estado: string;
	public dashboard: Dashboard;
}


export class EpsResolucion {
	public id: number;
	public epsId: number;
	public eps: Eps;
	public resolucionId: number;
	public resolucion: any;
	public fechaCreacion: any;
	public estado: string;
}
export class EspecialidadCup {
	public id: number;
	public especialidadId: number;
	public especialidad: Especialidad;
	public cupId: number;
	public cup: Cup;
	public fechaCreacion: any;
	public estado: string;
}
export class EspecialidadCupNivel {
	public id: number;
	public especialidadId: number;
	public especialidad: Especialidad;
	public nivelCup: number;
	public fechaCreacion: any;
	public estado: string;
}
export class CategoriaResponsable {
	public id: number;
	public nombre: string;
	public descripcion: string;
	public fechaCreacion: any;
	public estado: string;
}
export class OrientacionSexual {
	public id: number;
	public nombre: string;
	public descripcion: string;
	public fechaCreacion: any;
	public estado: string;
}
export class CausaExterna {
	public id: number;
	public codigo: string;
	public nombre: string;
	public fechaCreacion: any;
	public estado: string;
}
export class Ciudad {
	public id: number;
	public descripcion: string;
	public fechaCreacion: any;
	public fechaFin: any;
	public departamentoID: number;
	public departamento: Departamento;
	public estado: string;
	public app_Id: number;
	public codigoDane: string;
	public sede: Sede[];
}
export class Contrato {
	public id: number;
	public nombre: string;
	public codigoContratoApp: number;
	public estado: string;
	public fechaInicio: any;
	public fechaFin: any;
	public fechaCreacion: any;
	public epsId: number;
	public eps: Eps;
}
export class CorreoVoBo {
	public id: number;
	public correo: string;
	public nombreResponsable: string;
	public estado: string;
	public fechaCreacion: any;
}
export class Cup {
	public id: number;
	public codigo: string;
	public descripcion: string;
	public grupo: string;
	public nota_Tecnica: string;
	public estado: string;
	public nivel: number;
	public resolucion_Id: number;
	public resolucionCup: any;

}

export class Departamento {
	public id: number;
	public nombre: string;
	public observacion: string;
	public fechaCreacion: any;
	public zonalID: number;
	public zona: any;
	public estado: string;
	public fechaFin: any;
	public codigoDane: string;
	public paisId: number;
	public pais: any;
	public ciudad: Ciudad[];
}
export class Diagnostico {
	public id: number;
	public codigo: string;
	public simbolo: string;
	public descripcion: string;
	public nombreBusqueda: string;
	public sexoId: number;
	public sexo: any;
	public diasIncapacidad: number;
	public dx: boolean = false;
	public swCertAislamiento: boolean = false;
	public swCertReintegro: boolean = false;

}
export class Discapacidad {
	public id: number;
	public nombre: string;
	public fechaCreacion: any;
	public estado: string;
}
export class Eps {
	public id: number;
	public nombre: string;
	public fechaCreacion: any;
	public fechaModificacion: any;
	public estado: string;
	public contratoNombre: string;
	public epsCiudades: any[];
}
export class Escolaridad {
	public id: number;
	public nombre: string;
	public fechaCreacion: any;
	public estado: string;
}
export class Especialidad {
	public id: number;
	public nombre: string;
	public observacion: string;
	public fechaCreacion: any;
	public fechaFin: any;
	public estado: string;
	public app_Id: number;
	public cup_Id: number;
	public cups: Cup;
	public tipoMarcacion_Id: number;
	public rel_Profesional_Especialidad: any[];
}
export class Especialidad_HC {
	public id: number;
	public especialidad_Id: number;
	public rutaVista: string;
	public titulo: string;
	public fechaCreacion: any;
	public estado: string;
}
export class FinalidadConsulta {
	public id: number;
	public codigo: string;
	public descripcion: string;
	public fechaCreacion: any;
	public estado: string;
}
export class Parentesco {
	public id: number;
	public nombre: string;
	public descripcion: string;
	public fechaCreacion: any;
	public estado: string;
}
export class Profesional {
	public id: number;
	public nombres: string;
	public apellidos: string;
	public sexo: string;
	public identificacion: string;
	public estado: string;
	public fechaCreacion: any;
	public fechaModificacion: any;
	public fechaEliminacion: any;
	public codigo: string;
	public registroMedico: string;
	public firmaMedico: string;
	public firmaMedicoBase: string[];
	public usuarioId: number;
	public rel_Profesional_Especialidad: any[];
}
export class Sede {
	public id: number;
	public nombre: string;
	public fechaCreacion: any;
	public fechaInicio: any;
	public fechaFin: any;
	public ciudadID: number;
	public ciudad: Ciudad;
	public estado: string;
	public codigoAsociado: string;
	public app_Id: number;
	public direccion: string;
	public zona_Id: number;
	public zona: any;
	public swFactura: boolean = false;
	public ip: string;
	public telefono: string;
}
export class TipoDiagnosticoPpal {
	public id: number;
	public descripcion: string;
	public fechaCreacion: any;
	public estado: string;
}
export class Acompañante {
	constructor() {
		this.parentesco = new Parentesco();
		this.categoria = new CategoriaResponsable();
	}
	public nombre: string;
	public telefono: string;
	public parentesco: Parentesco;
	public cualOtroParentesco: string;
	public responsable: string;
	public celular: string;
	public categoria: CategoriaResponsable;
}
export class AntecedenteFamiliar {
	public hipertension: boolean = false;
	public fechaHipertension: any;
	public observacionHipertension: string;
	public diabetes: boolean = false;
	public fechaDiabetes: any;
	public observacionDiabetes: string;
	public cardiovasculares: boolean = false;
	public fechaCardiovasculares: any;
	public observacionCardiovasculares: string;
	public cancerMama: boolean = false;
	public fechaCancerMama: any;
	public observacionCancerMama: string;
	public cancerProstata: boolean = false;
	public fechaCancerProstata: any;
	public observacionCancerProstata: string;
	public cancerColon: boolean = false;
	public fechaCancerColon: any;
	public observacionCancerColon: string;
	public cancerPulmon: boolean = false;
	public fechaCancerPulmon: any;
	public observacionCancerPulmon: string;
	public otroTipoCancer: boolean = false;
	public fechaOtroTipoCancer: any;
	public observacionOtroTipoCancer: string;
	public observacionOtro: string;
}
export class AntecedenteGinecoObstetrico {
	public menarca: boolean = false;
	public observacionMenarca: string;
	public fechaMenarca: string;
	public ciclosMenstruales: string;
	public fum: any;
	public menopausia: boolean = false;
	public observacionMenopausia: string;
	public fechanMenopausia: string;
	public ets: boolean = false;
	public observacionETS: string;
	public autoExamenMama: boolean = false;
	public inicioRelacionesSexuales: boolean = false;
	public observacionInicioRelacionesSexuales: string;
	public actividadSexual: string;
	public tieneActividadSexual: boolean;
	public observacionActividadSexual: string;
	public numeroCompaneros: number;
	public numeroCompañeros: number = this.obtenerNumeroCompañero();
	public ninguno: boolean = false;
	public oral: boolean = false;
	public inyectable: boolean = false;
	public subdermico: boolean = false;
	public d_I_U: boolean = false;
	public condon: boolean = false;
	public esterilizacionFemenina: boolean = false;
	public vasectomia: boolean = false;
	public otros: boolean = false;
	public gravidez: number = 0;
	public partos: number = 0;
	public abortos: number = 0;
	public vaginales: number = 0;
	public cesareas: number = 0;
	public nacidosVivos: number = 0;
	public nacidosMuertos: number = 0;
	public ectopicos: number = 0;
	public fup: any;
	public gemelar: number = 0;
	public hemorragia_1: boolean = false;
	public hemorragia_2: boolean = false;
	public hemorragia_3: boolean = false;
	public preeclampsia: boolean = false;
	public eclampsia: boolean = false;
	public otrosPat: boolean = false;
	public observacionOtrosPat: string;
	public observacion: string;
	public obtenerNumeroCompañero() {
		return this.numeroCompañeros;

	}
}
export class HabitosGestionRiesgo {
	public azucarAlta: boolean = false;
	public medicamentoAntiHipertensivos: boolean = false;
	public observacionHabitosSaludables: string;
	public consumoAlimentosRicosFibra: boolean = false;
	public tomaAgua: boolean = false;
	public bajoConsumoGrasas: boolean = false;
	public bajoConsumoSal: boolean = false;
	public ejercicioPermanente: boolean = false;
	public horasSueñoAdecuadas: boolean = false;
	public horasSuenoAdecuadas: boolean = false;
	public pesoAdecuadoTalla: boolean = false;
	public buenosHabitosAalimenticios: boolean = false;
	public sustanciasPsicoactivas: boolean = false;
	public observacionSustanciasPsicoactivas: string;
	public alcohol: boolean = false;
	public observacionAlcohol: string;
	public frecuenciaAlcohol: number;
	public periodoAlcohol: string;
	public fumador: string = "No";
	public observacionFumador: string;
	public frecuenciaFumador: number;
	public frecuenciaFumadorDias: number;
	public frecuenciaFumadorAnios: number;
	public indiceTabaquico: string = "";
	public riesgoEPOC: string;
	public periodoFumador: string;
	public estres: boolean = false;
	public observacionEstres: string;
	public habitoOtros: boolean = false;
	public observacionHabitoOtros: string;
	public sedentarismo: boolean = false;
	public observSedentarismo: string = "";
	public victimaMaltrato: boolean;
	public preTestVIH: boolean = false;
	public victimaViolenciaSexual: boolean;
	public postTestVIH: boolean = false;
	public sintomaticoRespiratorio: boolean;
	public discapacidad: string;
	//public sangreOcultaHeces: boolean = false;
	public sangreOcultaEnHeces: string;

	public toceMuchoMayoriaDias: boolean = false;
	public tieneFlemaMayoriaDias: boolean = false;
	public seQuedaSinAliento: boolean = false;
	public mayor40Anios: boolean = false;
	public actualmenteFumaOExfumador: boolean = false;
}
export class AntecedentePatologicos {
	public infartoMiocardio: boolean = false;
	public obsinfartoMiocardio: string;


	public emergenciaHipertensiva: boolean = false;
	public obsEmergenciaHipertensiva: string;

	public tromboembolismoPulmunar: boolean = false;
	public obsTromboembolismoPulmunar: string;

	public sindromeAortico: boolean = false;
	public obsSindromeAortico: string;

	public sincope: boolean = false;
	public obsSincope: string;

	public cataratas: boolean = false;
	public obscataratas: string;

	public desprendimientoRetina: boolean = false;
	public obsdesprendimientoRetina: string;

	public glaucoma: boolean = false;
	public obsGlaucoma: string;

	public retinopatiaDiabetica: boolean = false;
	public obsretinopatiaDiabetica: string;

	public ojoSeco: boolean = false;
	public obsojoSeco: string;

	public enfermedadVision: boolean = false;
	public obsEnfermedadVision: string;

	public enfermedadCerebroVascular: boolean = false;
	public obsenfermedadCerebroVascular: string;

	public eventoTrombotio: boolean = false;
	public obsEventoTrombotio: string;

	public eventoembolico: boolean = false;
	public obseventoembolico: string;


	public eventoHemorragico: boolean = false;
	public obseventoHemorragic: string;


	public eventoVascular: boolean = false;
	public obseventoVascular: string;

	public obstruccionesArteriales: boolean = false;
	public obsObstruccionesArteriales: string;

	public aneurismasaorticos: boolean = false;
	public obsaneurismasaorticos: string;

	public enfermedadBuerger: boolean = false;
	public obsenfermedadBuerger: string;

	public fenomenoRaynaud: boolean = false;
	public obsfenomenoRaynaud: string;

	public coagulosSanguineos: boolean = false;
	public obscoagulosSanguineos: string;

	public emboliaPulmonar: boolean = false;
	public obsemboliaPulmonar: string;

	public flebitis: boolean = false;
	public obsflebitis: string;

	public enfermedadRenal: boolean = false;
	public obsenfermedadRenal: string;

	public insuficienciaRenalAguda: boolean = false;
	public obsinsuficienciaRenalAguda: string;

	public danorenalAgudo: boolean = false;
	public obsdanorenalAgudo: string;

	public insuficienciaRenalcronica: boolean = false;
	public obsinsuficienciaRenalcronica: string;

	public EPOC: boolean = false;
	public obsEPOC: string;


	public artritisReumatoide: boolean = false;
	public obsartritisReumatoide: string;

	public pruebaVIH: boolean = false;
	public observacionPruebaVIH: string;

	public pruebaTBC: boolean = false;
	public observacionPruebaTBC: string;

	public arritmias: boolean = false;
	public observacionArritmias: string;
	public historicoObservacionArritmias: string[];
	public autoinmunes: boolean = false;
	public observacionAutoinmunes: string;
	public historicoAutoinmunes: string[];
	public cancer: boolean = false;
	public observacionCancer: string;
	public historicoCancer: string[];
	public ecv: boolean = false;
	public observacionECV: string;
	public historicoECV: string[];
	public diabetes: boolean = false;
	public observacionDiabetes: string;
	public historicoDiabetes: string[];
	public dislipidemia: boolean = false;
	public observacionDislipidemia: string;
	public historicoDislipidemia: string[];
	public hipoglicemia: boolean = false;
	public observacionHipoglicemia: string;
	public historicoHipoglicemia: string[];
	public hipertension: boolean = false;
	public observacionHipertension: string;
	public historicoHipertension: string[];
	public internaciones: boolean = false;
	public observacionInternaciones: string;
	public historicoInternaciones: string[];
	public insuficienciaCardiaca: boolean = false;
	public observacionInsuficienciaCardiaca: string;
	public historicoInsuficienciaCardiaca: string[];
	public infeccioso: boolean = false;
	public observacionInfeccioso: string;
	public historicoInfeccioso: string[];
	public valvulopatias: boolean = false;
	public observacionValvulopatias: string;
	public historicoValvulopatias: string[];
	public transtornosHormonales: boolean = false;
	public observacionTranstornosHormonales: string;
	public historicoTranstornosHormonales: string[];
	public transtornosGastrointestinales: boolean = false;
	public observacionTranstornosGastrointestinales: string;
	public historicoTranstornosGastrointestinales: string[];
	public transtornosNeuronales: boolean = false;
	public observacionTranstornosNeuronales: string;
	public historicoTranstornosNeuronales: string[];
	public otros: boolean = false;
	public observacionOtros: string;
	public historicoOtros: string[];
	public histerectomia: boolean = false;
	public observacionHisterectomia: string;
	public fechaHisterectomia: string;
	public historicoHisterectomia: string[];
	public vacectomia: boolean = false;
	public observacionVacectomia: string;
	public fechaVacectomia: string;
	public historicoVacectomia: string[];
}

export class Incapacidad {
	public swIncapacidad: boolean = false;
	public codiDiagnostico: string;
	public dxRelacionado: string;
	public desDiagnostico: string = "";
	public tipoDiagnostico: string = "";
	public incapacidadPorEstetica: boolean = false;
	public prorroga: boolean = false;
	public fechaIncapacidad: any = new Date().toISOString().slice(0, 10);
	public numeroDias: number = 0;
	public fechaFinal: any;
	public observacion: string;
	public grupoServicio: string;
	public modalidadPrestacionServicio: string;

	prestador: PrestadorServicioSalud;
	fechaProbableParto: Date;
	edadGestacional: number;
	embarazoMultiple: boolean;
	numeroNacidoVivos: number;
	numeroCertificadoNacidoVivos: number;
}


export class PrestadorServicioSalud {
	public id: number;
	public nombre: string;
	public nit: string;
	public codigo: string;

}

export class Certificado {
	public fechaInicio: Date = new Date();
	public fechaFinal: Date = new Date();
	public observacion: string = "Definida desde la impresion";
}

export class PlanManejoPostCovid {
	public laboratorio: boolean;
	public terapia: boolean;
	public tipoTerapias: Terapias;
	public remisionEspecialista: boolean;
	public ayudaDiagnostica: boolean;
	public control: boolean;
	constructor() {
		this.tipoTerapias = new Terapias();
	}
}

export class Terapias {
	respiratorias: boolean;
	fisicas: boolean;
	psicologia: boolean;
}

export class Laboratorio {
	public cup: VMCup;
	public nota: string;
	public pf: boolean = false;
}
export class HC {
	constructor() {

		this.acompanante = new Acompañante();
		this.quirurgicos = new Array<VMAntecedente>();
		this.traumaticos = new Array<VMAntecedente>();
		this.transfusiones = new Array<VMAntecedente>();
		this.alergicos = new Array<VMAntecedente>();
		this.farmacologicos = new Array<VMAntecedente>();
		this.quirurgicos = new Array<VMAntecedente>();
		this.antecedenteGinecoObstetrico = new AntecedenteGinecoObstetrico();
		this.antecedenteFamiliar = new AntecedenteFamiliar();
		this.antecedentePatologicos = new AntecedentePatologicos();
		this.ListadoOrdenamiento = new Array<Ordenamiento>();
	}
	public ListadoResultado: Array<VmResultado>;
	public ListadoOrdenamiento: Array<Ordenamiento>;
	public consultaId: number;
	public fechaCreacion: string;
	public profesional: Profesional;
	public especialidad: Especialidad;
	public sede: Sede;
	public padreId: string;
	public datosUsuario: VMPaciente;
	public acompañante: Acompañante = this.obtenerdatoscompanante();
	public acompanante: Acompañante;
	public motivo: string;
	public ultimaEnfermedad: string;
	public antecedentePatologicos: AntecedentePatologicos;
	public quirurgicos: VMAntecedente[];
	public traumaticos: VMAntecedente[];
	public transfusiones: VMAntecedente[];
	public alergicos: VMAntecedente[];
	public farmacologicos: VMAntecedente[];
	public antecedenteGinecoObstetrico: AntecedenteGinecoObstetrico;
	public antecedenteFamiliar: AntecedenteFamiliar;
	public habitosGestionRiesgo: HabitosGestionRiesgo;
	public analisisYplan: string;
	public diagnosticos: VMDiagnostico[];
	public diagnosticoPrincipal: DiagnosticoPrincipal;
	public incapacidad: Incapacidad;
	public swIncapacidad: boolean = false;
	public laboratorio: Laboratorio[];
	public procedimientoDx: ProcedimientoDx[];
	public procedimiento: Procedimiento[];
	public medicamento: HCMedicmento;
	public referencia: Referencia[];
	public promocionYPrevencion: PromocionYPrevencion[];
	public recomendacionesMedicas: string;
	public seguimiento: Boolean = false;
	public segNoPresencial: SegNoPresencial;
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
	public obtenerdatoscompanante() {
		return this.acompanante;
	}

}

export class HCSeguimiento {
	constructor() {

		this.acompanante = new Acompañante();
		this.quirurgicos = new Array<VMAntecedente>();
		this.traumaticos = new Array<VMAntecedente>();
		this.transfusiones = new Array<VMAntecedente>();
		this.alergicos = new Array<VMAntecedente>();
		this.farmacologicos = new Array<VMAntecedente>();
		this.quirurgicos = new Array<VMAntecedente>();
		this.antecedenteGinecoObstetrico = new AntecedenteGinecoObstetrico();
		this.antecedenteFamiliar = new AntecedenteFamiliar();
		this.antecedentePatologicos = new AntecedentePatologicos();
		this.ListadoOrdenamiento = new Array<Ordenamiento>();
	}
	public ListadoResultado: Array<VmResultado>;
	public ListadoOrdenamiento: Array<Ordenamiento>;
	public consultaId: number;
	public fechaCreacion: string;
	public profesional: Profesional;
	public especialidad: Especialidad;
	public sede: Sede;
	public padreId: string;
	public datosUsuario: VMPaciente;
	public acompañante: Acompañante = this.obtenerdatoscompanante();
	public acompanante: Acompañante;
	public motivo: string;
	public ultimaEnfermedad: string;
	public antecedentePatologicos: AntecedentePatologicos;
	public quirurgicos: VMAntecedente[];
	public traumaticos: VMAntecedente[];
	public transfusiones: VMAntecedente[];
	public alergicos: VMAntecedente[];
	public farmacologicos: VMAntecedente[];
	public antecedenteGinecoObstetrico: AntecedenteGinecoObstetrico;
	public antecedenteFamiliar: AntecedenteFamiliar;
	public analisisYplan: string;
	public diagnosticos: VMDiagnostico[];
	public diagnosticoPrincipal: DiagnosticoPrincipal;
	public laboratorio: Laboratorio[];
	public procedimientoDx: ProcedimientoDx[];
	public procedimiento: Procedimiento[];
	public medicamento: HCMedicmento;
	public referencia: Referencia[];
	public promocionYPrevencion: PromocionYPrevencion[];
	public recomendacionesMedicas: string;
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
	public obtenerdatoscompanante() {
		return this.acompanante;
	}

}
export class SegNoPresencial {
	public observacion: string = "";
	public fechaSeguimiento: Date;
	public tipoAccesoId: number = 0;

}

export class HCMedicmento {
	constructor() {
		this.medicamentos = new Array<Medicamento>();
	}
	public medicamentos: Medicamento[];
	public fechaInicioPF: string;
	public fechaFinPF: string;
	public numeroMeses: number;
}
export class Medicamento {
	public numeroOrden: number;
	public medicamento: VMMedicamento;
	public interccionMedicamentos: string;
	public cantidad: number;
	public dosificacion: string;
	public dias: number;
	public pf: boolean = false;
	public fechaInicial: any;
	public fechaFinal: any;
	public codServicio: string;
}
export class MasterMorbilidad {
	public consultas: HCMorbilidad[];

}
export class RevisionSistema {
	public pielYAnexos: string;
	public ojos: string;
	public oido: string;
	public nariz: string;
	public boca: string;
	public cardiovascular: string;
	public respiratorio: string;
	public gastroIntestinal: string;
	public genitalUrinario: string;
	public musculoEsqueleto: string;
	public endocrino: string;
	public nervioso: string;
	public hematopoyetico: string;
	public linfatico: string;
}
export class Procedimiento {
	public cup: VMCup;
	public tarifa: string;
	public tipo: string;
	public viaAcceso: number;
}


export class Ordenamiento {
	public cup: VMCup;
	public tipo: string;
	public nota: string;
	public cantidad: number = 1;
  public fechaProximoControl: Date;
	fechaCreacion: Date;
	fechaVencimiento: Date;
	/*Odontologia*/
	public diagnostico: VMDiagnosticoOdontologico;
	public listadoCup: Array<VMCup>;
	public listadoCupsTableSeleccionados = [];
	listadoDiagnosticoTableSeleccionados = [];
	public diente: number;
	public cara: number;
	public evento: string;

	check:boolean = false;
	idRandom: number;
	swRequierePreanestesiologia: boolean;

	swPropio: boolean;
	swCirugia: boolean;

	ordenCx:GruposOrdenRedCx;
	grupo:number;
}

export class VMHistorico {
	public agrupador: string;
	public codigo: string;
	public descrpcion: string;
	public fechaCreacion: Date;
	public realizado: boolean;
}


export class ProcedimientoDx {
	public cup: VMCup;
	public nota: string;
	public pf: boolean = false;

}
export class PromocionYPrevencion {
	public diagnosticos: VMDiagnostico;
}
export class Referencia {
	public cup: VMCup;
}
export class VmResultado {
	public cup: VMCup;
	public fechaResultado: any;
	public descripcionResultado: string;
	public resultado: string;
	public numeroAutorizacion: string;
	public swAgregar: boolean = true;
}


export class ResultadoApoyoDX {
	public cup: VMCup;
	public fechaResultado: any;
	public descripcionResultado: string;
}
export class ResultadoImagenologia {
	public cup: VMCup;
	public resultado: string;
	public fechaResultado: any;
	public descripcionResultado: string;
}
export class ResultadoLaboratorio {
	public cup: VMCup;
	public resultado: string;
	public fechaResultado: any;
	public descripcionResultado: string;
}

export class DiagnosticoPrincipal {
	public tipoDiagnosticoPpal: TipoDiagnosticoPpal;
	public finalidadConsulta: FinalidadConsulta;
	public causaExterna: CausaExterna;

	constructor() {
		this.causaExterna = new CausaExterna();
		this.finalidadConsulta = new FinalidadConsulta();
		this.tipoDiagnosticoPpal = new TipoDiagnosticoPpal();
	}
}
export class ExamenFisico {
	public presionSistolica: number;
	public presionDiastolica: number;
	public pulso: number;
	public frecuenciaRespiratoria: number;
	public temperatura: number;
	public peso: number;
	public talla: number;
	public imc: string = "0";
	public circunferenciaAbdominal: number;
	public perimetroCefalico: number;
	public perimetroBraquial: number;
	public pliegueCutaneoSubescapular: number;
	public pliegueCutaneoTriceps: number;
	public presiones: string;
	public piel: string;
	public cabeza: string;
	public cuello: string;
	public ojos: string;
	public nariz: string;
	public boca: string;
	public oidos: string;
	public torax: string;
	public abdomen: string;
	public genitoUrinario: string;
	public musculoEsqueletico: string;
	public neurologico: string;
	public vascularPeriferico: string;
}

export class OrdenamientoHC {

	ordenes: Array<Ordenamiento>;
	paciente: VMPaciente;
	diagnosticoId: number = 0
	citaId: string = '';
	usuarioId: number = 0;
  swHC: boolean;
  swQuirofano: boolean;

	ordenesCx: Array<GruposOrdenRedCx>;

	constructor() {

		this.ordenes = new Array<Ordenamiento>();

		this.paciente = new VMPaciente();
		this.ordenesCx = new Array<GruposOrdenRedCx>();
	}

}

export class planificacionFamiliarHC {



}

export class AdultoHC {
	paraclinicos: Paraclinicos;
	tamisajesDeValoracion: TamisajesDeValoracion
	evolucionMedicaDiagnostica: EvolucionMedicaDiagnostica
	planDeManejo: PlanDeManejo
	factoresDeRiesgoBiologico: FactoresDeRiesgoBiologico
	factoresDeRiesgoPsicosocial: FactoresDeRiesgoPsicosocial;
	factoresDeriesgoParaOrigenDiabetes: FactoresDeriesgoParaOrigenDiabetes;
	esEPOC: boolean;
	epoc: EPOC;
	observaciones: string;
	familiograma: Familiograma;
	ecomapa: Ecomapa;

	apgar: Array<BaseList>;
	public apgarComplete: Array<BaseList>;

	antecedentes: AntAdo;
	antecedentesGinecoObstetricos: AntecedentesGinecoObstetricos;
	antecedentesAndrologicos: AntecedentesAndrologicos;
	sexualidad: Sexualidad;

	tamizajeSaludMental: Array<BaseListTamizajeMental>;
	public tamizajeSaludMentalComplete: Array<BaseListTamizajeMental>;

	public interpretacionTamizajeSaludMental: string;
	tamizajeSaludBucal: TamizajeSaludBucal;


	indiceBarthel: IndiceBarthel;
	indiceBarthelComplete: IndiceBarthel;
	testLindaFried: TestLindaFried;
	testMinimental: TestMinimental;
	planDeCuidado: PlanDeCuidadoAdulto;

	public rcvFramigham: string;
	public nivelRiesgo: string;
}


export class PlanDeCuidadoAdulto {
	public saludBucal: boolean;
	public riesgoCardiovascular: boolean;
	public vacunoTexoide: boolean;
	public vacunoInfluenza: boolean;
	public hepatitisC: boolean;
	public planificaActualmente: boolean;
	public incluirProgramaPlanificacion: boolean;
	public educacionGrupal: boolean;
	public educacionGrupalCognitivoEmocional: boolean;
	public citologiaVaginal: boolean;
	public ameritaCitologiaVagina: boolean;

}


export class HCMorbilidad extends HC {
	public esPlanificacionFamiliar: boolean = false;

	public SaludMentalHC: SaludMental;
	public observacionSaludMental: string;
	public esSaludMental: boolean = false;
	public observacionMama: string;
	public esMama: boolean = false;

	public planificacionFamiliarHC: PlanificacionFamiliar
	public PrenatalHC: Prenatal;
	public mamaHC: Mama;


	public citaId: string;
	public revisionSistema: RevisionSistema;
	public examenFisico: ExamenFisico;
	public resultadoLaboratorio: ResultadoLaboratorio[];
	public resultadoImagenologia: ResultadoImagenologia[];
	public resultadoApoyoDX: ResultadoApoyoDX[];
	public joven: boolean = false;
	public observacionNegacionJoven: string;
	public jovenDiagnosticoId: number;
	public descripcionJoven: string;
	public planificacionFamiliar: boolean = false;
	public observacionNegacionPlanificacionFamiliar: string;
	public planificacionFamiliarId: number;
	public descripcionPlanificacionFamiliar: string;
	public controlPlanificacionFamiliar: ControlPlanificacionFamiliar;
	public infgresoPlanificacionFamiliar: PlanificacionFamiliar;

	public adulto: boolean = false;
	public observacionNegacionAdulto: string;

	public esAdulto: boolean = false;
	public esJoven: boolean = false;
	public adolescencia: boolean = false;
	public esVejez: boolean;

	public adolescenciaHC: Adolescencia;
	public adultoHC: AdultoHC;
	public jovenHC: Joven

	public observacionAdolescencia: string;
	// public adultoDiagnosticoId: number;
	// public descripcionAdulto: string;

	public agudezaVisual: boolean = false;
	public observacionNegacionAgudezaVisual: string;
	public visualDiagnosticoId: number;
	public descripcionVisual: string;

	public ojoDerecho: string;
	public ojoIzquierdo: string;
	public observacionesAlteraciones: string;

	public oidoDiagnosticoId: number;
	public otoscopia: boolean;
	public otoscopiaOidoDerecho: string;
	public otoscopiaOidoIzquierdo: string;
	public observacionesAlteracionesOido: string;


	public prenatal: boolean = false;
	public observacionNegacionPrenatal: string;
	public pes: boolean = false;
	public observacionNegacionPes: string;
	public pesHC: Pes;
	public crecimientoDesarrollo: boolean = false;
	public primeraInfancia: boolean = false;
	public infancia: boolean = false;

	public observacionNegacionCrecimientoDesarrollo: string;
	public crecimientoDesarrolloDiagnosticoId: number = 1; // ojo eliminar no se utiliza
	public crecimientoYDesarrollo: CrecimientoDesarrollo;
	public gestante: boolean = false;
	public observacionNegacionGestante: string;
	public gestanteDiagnosticoId: number;
	public gestanteHc: Gestante;
	public esVacunacion: boolean = false;
	public observacionNegacionVacunacion: string;
	public vacunacion: Array<Vacunacion>;
	public cervix: boolean = false;
	public observacionCervix: string;
	public cervixHC: Cervix;

	public swAiepi: boolean;
	public aiepi: AIAPIS;

	public Especialidad: Especialidad;

	public certificadoAislamiento: Certificado;
	public swCertificadoAislamiento: boolean = false;

	public certificadoReintegro: Certificado;
	public swCertificadoReintegro: boolean = false;

	public swEpoc: boolean;
	public epoc: epocHc;

	citaImpresion: CitasImpresion;
	edadPaciente: number;
	notaAdministrativa: Array<Nota>;
	testPostCovid: TestPostCovid;
	planDeManejoPostCovid: PlanManejoPostCovid;

    public  OrdenamientoHC:OrdenamientoHC;
	public resultadoLaboratorioLeidos: Array<ResultadoAnnar>;

	//listadoPYP: Array<pyp>;
}

export class HCSegumiento extends HCSeguimiento {
	public esPlanificacionFamiliar: boolean = false;

	public SaludMentalHC: SaludMental;
	public observacionSaludMental: string;
	public esSaludMental: boolean = false;
	public observacionMama: string;
	public esMama: boolean = false;

	public planificacionFamiliarHC: PlanificacionFamiliar
	public PrenatalHC: Prenatal;
	public mamaHC: Mama;


	public citaId: string;
	public resultadoLaboratorio: ResultadoLaboratorio[];
	public resultadoImagenologia: ResultadoImagenologia[];
	public resultadoApoyoDX: ResultadoApoyoDX[];
	public joven: boolean = false;
	public observacionNegacionJoven: string;
	public jovenDiagnosticoId: number;
	public descripcionJoven: string;
	public planificacionFamiliar: boolean = false;
	public observacionNegacionPlanificacionFamiliar: string;
	public planificacionFamiliarId: number;
	public descripcionPlanificacionFamiliar: string;
	public controlPlanificacionFamiliar: ControlPlanificacionFamiliar;
	public infgresoPlanificacionFamiliar: PlanificacionFamiliar;

	public adulto: boolean = false;
	public observacionNegacionAdulto: string;

	public esAdulto: boolean = false;
	public esJoven: boolean = false;
	public adolescencia: boolean = false;
	public esVejez: boolean;

	public adolescenciaHC: Adolescencia;
	public adultoHC: AdultoHC;
	public jovenHC: Joven

	public observacionAdolescencia: string;

	public agudezaVisual: boolean = false;
	public observacionNegacionAgudezaVisual: string;
	public visualDiagnosticoId: number;
	public descripcionVisual: string;

	public ojoDerecho: string;
	public ojoIzquierdo: string;
	public observacionesAlteraciones: string;

	public oidoDiagnosticoId: number;
	public otoscopia: boolean;
	public otoscopiaOidoDerecho: string;
	public otoscopiaOidoIzquierdo: string;
	public observacionesAlteracionesOido: string;


	public prenatal: boolean = false;
	public observacionNegacionPrenatal: string;
	public pes: boolean = false;
	public observacionNegacionPes: string;
	public pesHC: Pes;
	public crecimientoDesarrollo: boolean = false;
	public primeraInfancia: boolean = false;
	public infancia: boolean = false;

	public observacionNegacionCrecimientoDesarrollo: string;
	public crecimientoDesarrolloDiagnosticoId: number = 1; // ojo eliminar no se utiliza
	public crecimientoYDesarrollo: CrecimientoDesarrollo;
	public gestante: boolean = false;
	public observacionNegacionGestante: string;
	public gestanteDiagnosticoId: number;
	public gestanteHc: Gestante;
	public esVacunacion: boolean = false;
	public observacionNegacionVacunacion: string;
	public vacunacion: Array<Vacunacion>;
	public cervix: boolean = false;
	public observacionCervix: string;
	public cervixHC: Cervix;

	public swAiepi: boolean;
	public aiepi: AIAPIS;

	public Especialidad: Especialidad;

	public certificadoAislamiento: Certificado;
	public swCertificadoAislamiento: boolean = false;

	public certificadoReintegro: Certificado;
	public swCertificadoReintegro: boolean = false;

	public swEpoc: boolean;
	public epoc: epocHc;

	citaImpresion: CitasImpresion;
	edadPaciente: number;
	notaAdministrativa: Array<Nota>;
	testPostCovid: TestPostCovid;
	planDeManejoPostCovid: PlanManejoPostCovid;

	public resultadoLaboratorioLeidos: Array<ResultadoAnnar>;
  OrdenamientoHC: OrdenamientoHC;
}

export class ParMetodoPlanificacion {
	id: number;
	descripcion: string;
	estado: string;
	fechaCreacion: string;
}

export class ParMetodoAnticonceptivos {
	id: number;
	descripcion: string;
	estado: string;
	fechaCreacion: string;
}

export class ParPresentacionesFetales {
	id: number;
	descripcion: string;
	estado: string;
	fechaCreacion: string;
}

export class ControlPlanificacionFamiliar {

	public metodoActual: string;
	public fum: any;
	public ciclos: string;
	public amenorrea: boolean = false;
	public sangrado: boolean = false;
	public manchado: boolean = false;
	public lactando: boolean = false;
	public cefaleaMareo: boolean = false;
	public dolorMamario: boolean = false;
	public dolorPelvico: boolean = false;
	public flujoVaginal: boolean = false;
	public varices: boolean = false;
	public manchasPiel: boolean = false;
	public cambiosEstadoAnimo: boolean = false;
	public satisfaccionMetodoActual: boolean = false;
	public mamas: string;
	public abdomen: string;
	public cervix: string;
	public utero: string;
	public vdrl: boolean = false;
	public vdrlResultado: string;
	public vph: boolean = false;
	public patologiaCervical: boolean = false;
	public ive: boolean = false;

	public anexos: string;
	public comentarios: string;
	public cambioMetodo: boolean = false;
	public nuevoMetodo: string;
	public citologiaVaginal: string;
	public realizoCitologiaVaginal: boolean;
	public fechaCitologia: any;
	public resultadoCitologia: string;
	public fechaProximaCita: any;

	public observaciones: string;
}

export class PlanificacionFamiliar {
	flujoVagina: string;
	controlPlanificacionFamiliar: ControlPlanificacionFamiliar;
	iTS: boolean = false;
	embarazos: boolean = false;
	abortos: boolean = false;
	secrecionPeneana: string = "NORMAL";
	flujoPatologicoVaginal: string = "NORMAL";
	conductaSexual: string = "";
	edadInicioRelacionSexual: string = "";
	relacionesSexualesCon: string = "";
	usoHabitualCondon: boolean = false;
	usoActualAnticonceptivo: ParMetodoPlanificacion;
	seguimientoAnticonceptivo: ParMetodoPlanificacion;

	varices: boolean = false;
	cefalePermanente: boolean = false;
	fumaCigarrillos: boolean = false;
	medicamentoConvulsiones: boolean = false;
	hipertension: boolean = false;
	rifampicinaFriseofulvina: boolean = false;
	amamantabebe6meses: boolean = false;
	creeembarazadaActualmente: boolean = false;
	hemorragiaVaginalInusual: boolean = false;
	problemasCorazon: boolean = false;
	enfermedadVesicular: boolean = false;
	cirugiaPlaneada: boolean = false;
	bebeultimos21dias: boolean = false;
	tumorHigado: boolean = false;
	jaquecaVisionBorrosa: boolean = false;
	metodoAnticonceptivo: ParMetodoAnticonceptivos = new ParMetodoAnticonceptivos();
	public deseaTenerHijos: boolean = false;
	public vacunacion: boolean = false;
	public vacunacionVPH: string;
	public vacunacionDPT: string;
	recomendaciones: string;
}
export class Gestante {
	public embarazoActual: any;
	public controlPrenatal: any;
	public calificacionRiesgosObstetricos: any;
}
export class Antecedentes {
	public id: any;
	public usuarioId: number;
	public antecedentesHistorico: AntecedentesHistorico[];
}
export class AntecedentesHistorico {
	public fecha: any;
	public consultaId: number;
	public antecedentePatologicos: AntecedentePatologicos;
	public quirurgicos: VMAntecedente[];
	public traumaticos: VMAntecedente[];
	public transfusiones: VMAntecedente[];
	public alergicos: VMAntecedente[];
	public farmacologicos: VMAntecedente[];
	public antecedenteGinecoObstetrico: AntecedenteGinecoObstetrico;
	public antecedenteFamiliar: AntecedenteFamiliar;
}
export class GuardarHCMorbilidad {
	public identificador: string;
	public agrupadorMedicamento: string;
	public error: boolean;
	public html: string;
  public  agrupadorOrdenamiento:string ;
  public  irFrente:boolean;
}

export class GuardarHCSeguimiento {
	public identificador: string;
	public agrupadorMedicamento: string;
	public error: boolean;
	public html: string;
  public  agrupadorOrdenamiento:string ;
  public  irFrente:boolean;
}



export class JSONHc {
	consultaId: string;
	json: string;
	tipo: string;
	UsuarioId: number;
}

export class VMHistoricoResultado {
  public fechaCreacion: string;
  public seguimientoResultado: VMSeguimientoResultado;
  public signosVitales: VMSignosVitales;
  public graficarDatos: any; // puedes cambiar a un tipo específico si sabes qué estructura tendrá

  constructor() {
    this.seguimientoResultado = new VMSeguimientoResultado();
    this.signosVitales = new VMSignosVitales();
  }
}

export class VMSeguimientoResultado {
  public resultadoCreatinina: string;
  public inicialCreatinina: boolean;
  public resultadoGlicemia: string;
  public inicialGlicemia: boolean;
  public resultadoTrigliceridos: string;
  public inicialTrigliceridos: boolean;
  public resultadoHemoglobina: string;
  public inicialHemoglobina: boolean;
  public resultadoColesterolTotal: string;
  public inicialColesterolTotal: boolean;
  public resultadoPTH: string;
  public inicialPTH: boolean;
  public resultadoMicroAlbuminuria: string;
  public inicialMicroAlbuminuria: boolean;
  public resultadoColesterolHDL: string;
  public inicialColesterolHDL: boolean;
  public resultadoProteina24H: string;
  public inicialProteina24H: boolean;
  public resultadoPotasio: string;
  public inicialPotasio: boolean;
  public resultadoColesterolLDL: string;
  public inicialColesterolLDL: boolean;
  public resultadoCreatinuria: string;
  public inicialCreatinuria: boolean;
  public resultadoFosforo: string;
  public inicialFosforo: boolean;
  public resultadoAlbumina: string;
  public inicialAlbumina: boolean;
  public resultadoUroanalisis: string;
  public inicialUroanalisis: boolean;
  public resultadoHemograma: string;
  public inicialHemograma: boolean;
  public resultadoCalcio: string;
  public inicialCalcio: boolean;
  public resultadoDepuracionCreatininaEnOrina24H: string;
  public inicialDepuracionCreatininaEnOrina24H: boolean;
  public resultadoNitrogenoUreicoSangre: string;
  public inicialNitrogenoUreicoSangre: boolean;
  public resultadoHemoclasificacion: string;
  public inicialHemoclasificacion: boolean;
  public resultadoALT: string;
  public inicialALT: boolean;
  public resultadoAST: string;
  public inicialAST: boolean;
  public resultadoTFG: number;
}

export class VMSignosVitales {
  public presionSistolica: number;
  public presionDiastolica: number;
  public frecuenciaCardiaca: number;
  public frecuenciaRespiratoria: number;
  public temperatura: number;
}

export class IdentidadGenero {
	public id: number;
	public nombre: string;
	public descripcion: string;
	public fechaCreacion: any;
	public estado: string;
}
