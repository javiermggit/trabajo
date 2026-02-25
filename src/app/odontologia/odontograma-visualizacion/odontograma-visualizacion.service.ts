import { Injectable, Inject } from '@angular/core';
import { Diente, Indicador, Indice, indiceCOPCEO } from 'src/app/Modelos/Odontologia';
import { HttpClient } from '@angular/common/http';
import { VMCup, VMDiagnosticoOdontologico } from 'src/app/Modelos/Modelos';
import { ImpresionDiagnosticaOdontoService } from '../impresion-diagnostica-odonto/impresion-diagnostica-odonto.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConductaOdontoService } from '../conducta-odonto/conducta-odonto.service';
import { EvolucionService } from '../evolucion/evolucion.service';
import { MedicoService } from 'src/app/medico/medico.service';
import Swal from 'sweetalert2';
import { IndicadoresService } from '../indicadores/indicadores.service';
import { OdontologiaService } from '../odontologia.service';
import { DatosPacienteService } from 'src/app/datos-paciente/datos-paciente.service';
import { OrdenRedCx } from 'src/app/Modelos/Quirofano';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class OdontogramaVisualizacionService {
	dientes: Diente[];
	observacion: string = "";
	eventos: string;
	estado: string;
	cara: number;
	caras: number[] = [2, 4];
	diente: number;
	esControl: boolean = false;
	esUrgencia: boolean = false;
	esPrimeravez: boolean = false;
	esTelesalud: boolean = false;
	_baseUrlHc: string;
	hallazgoDiagnostico: any;
	hallazgoCups: any;
	diagnosticoEncontrado: any;
	cupEncontrado: any;
	dienteSeleccionado: any;
	modal: NgbModalRef;
	isCapturado: boolean = false;
	isImpresion: boolean = false;
	EventosConducta: any;
	eventoCup: any;
	eventosCOP: any;
	indicadorCOPCEO: Array<indiceCOPCEO>;

	constructor(
		private http: HttpClient,
		//@Inject('URLHc') baseUrlHc: string,
		public evolu: EvolucionService,
		public med: MedicoService,
		public impDiagnostico: ImpresionDiagnosticaOdontoService,
		public conductaCup: ConductaOdontoService,
		public odontoServices: OdontologiaService,
		public indicadores: IndicadoresService,
		private modalService: NgbModal) {
		this._baseUrlHc = environment.URLHc;
		this.dientes = [];
		this.observacion = "";
		this.indicadorCOPCEO = new Array<indiceCOPCEO>();

		this.eventosCOP = [
			{ hallazgo: 'mbs', estado: '', tipo: 'CN' },
			{ hallazgo: 'mbh', estado: '', tipo: 'CN' },
			{ hallazgo: 'icdas3', estado: '', tipo: 'C' },
			{ hallazgo: 'icdas4', estado: '', tipo: 'C' },
			{ hallazgo: 'icdas5', estado: '', tipo: 'C' },
			{ hallazgo: 'icdas6', estado: '', tipo: 'C' },
			{ hallazgo: 'obturacion', estado: '', tipo: 'C' },
			{ hallazgo: 'obturacionok', estado: '', tipo: 'O' },
			{ hallazgo: 'extraido', estado: '', tipo: 'P' },
			{ hallazgo: 'ok', estado: '', tipo: 'S' },
		]
		/*	this.eventosCOP = [
				{ hallazgo: 'corona', estado: '', tipo: 'O' },
				{ hallazgo: 'extraido', estado: '', tipo: 'P' },
				{ hallazgo: 'incrustacion', estado: '', tipo: 'O' },
				{ hallazgo: 'obturacionok', estado: '', tipo: 'O' },
				//	{ hallazgo: 'exodoncia', estado: '', tipo: 'P' },
				//{ hallazgo: 'exodonciaQx', estado: '', tipo: 'P' },
				{ hallazgo: 'incrustacion', estado: '', tipo: 'C' },
				{ hallazgo: 'mbs', estado: '', tipo: 'C' },
				{ hallazgo: 'mbh', estado: '', tipo: 'C' },
				{ hallazgo: 'obturacion', estado: '', tipo: 'C' },
				{ hallazgo: 'rr', estado: '', tipo: 'C' },
				{ hallazgo: 'rre', estado: '', tipo: 'C' },
				{ hallazgo: 'icdas3', estado: '', tipo: 'C' },
				{ hallazgo: 'icdas4', estado: '', tipo: 'C' },
				{ hallazgo: 'icdas5', estado: '', tipo: 'C' },
				{ hallazgo: 'icdas6', estado: '', tipo: 'C' },

			]*/

		this.hallazgoDiagnostico = [
			{ hallazgo: 'migracion', estado: '', diagnostico: [{ id: 16253, codigo: 'K073', descripcion: 'ANOMALIAS DE LA POSICION DEL DIENTE' }] },

			{ hallazgo: 'corona', estado: '', diagnostico: [{ id: 16255, codigo: 'K075', descripcion: 'ANOMALIAS DENTOFACIALES FUNCIONALES' }] },
			{ hallazgo: 'endodoncia', estado: '', diagnostico: [{ id: 16226, codigo: 'K038', descripcion: 'OTRAS ENFERMEDADES ESPECIFICADAS DE LOS TEJIDOS DUROS DE LOS DIENTES' }] },
			{ hallazgo: 'erupcionar', estado: '', diagnostico: [{ id: 16206, codigo: 'K007', descripcion: 'SÍNDROME DE LA ERUPCIÓN DENTARIA' }] },

			{
				hallazgo: 'extraido', estado: '', diagnostico: [{ id: 16206, codigo: 'K007', descripcion: 'SINDROME DE LA ERUPCION DENTARIA' },
				{ id: 16260, codigo: 'K081', descripcion: 'PERDIDA DE DIENTES DEBIDA A ACCIDENTE, EXTRACCION O ENFERMEDAD PERIODONTAL LOCAL' },
				{ id: 16217, codigo: 'K029', descripcion: 'CARIES DENTAL, NO ESPECIFICADA' }]
			},

			{ hallazgo: 'incrustacion', estado: '', diagnostico: [{ id: 16226, codigo: 'K038', descripcion: 'OTRAS ENFERMEDADES ESPECIFICADAS DE LOS TEJIDOS DUROS DE LOS DIENTES' }] },

			{ hallazgo: 'numerario', estado: '', diagnostico: [{ id: 16200, codigo: 'K001', descripcion: 'DIENTES SUPERNUMERARIOS' }] },
			{ hallazgo: 'intrusionextrusion', estado: '', diagnostico: [{ id: 16253, codigo: 'K073', descripcion: 'ANOMALIAS DE LA POSICION DEL DIENTE' }] },

			{ hallazgo: 'giroversion', estado: '', diagnostico: [{ id: 16253, codigo: 'K073', descripcion: 'ANOMALIAS DE LA POSICION DEL DIENTE' }] },

			{ hallazgo: 'obturaciont', estado: '', diagnostico: [{ id: 16226, codigo: 'K038', descripcion: 'OTRAS ENFERMEDADES ESPECIFICADAS DE LOS TEJIDOS DUROS DE LOS DIENTES' }] },

			{ hallazgo: 'obturacionok', estado: '', diagnostico: [{ id: 16226, codigo: 'K038', descripcion: 'OTRAS ENFERMEDADES ESPECIFICADAS DE LOS TEJIDOS DUROS DE LOS DIENTES' }] },
			{
				hallazgo: 'radiografia', estado: '', diagnostico: [
					{ id: 24242, codigo: 'Z012', descripcion: 'EXAMEN ODONTOLÓGICO' },
					{ id: 19659, codigo: 'S025', descripcion: 'FRACTURA DE LOS DIENTES ' },
					{ id: 16217, codigo: 'K029', descripcion: 'CARIES DENTAL, NO ESPECIFICADA' },
					{ id: 16228, codigo: 'K040', descripcion: 'PULPITIS' },
					{ id: 16229, codigo: 'K041', descripcion: 'NECROSIS DE LA PULPA' },
					{ id: 16262, codigo: 'K083', descripcion: 'RAIZ DENTAL RETENIDA' }]
			},
			{ hallazgo: 'restauracion', estado: '', diagnostico: [{ id: 16219, codigo: 'K031', descripcion: 'ABRASION DE LOS DIENTES' }] },
			{ hallazgo: 'restauracion', estado: '-r', diagnostico: [{ id: 16219, codigo: 'K031', descripcion: 'ABRASION DE LOS DIENTES' }, { id: 16220, codigo: 'K032', descripcion: 'EROSION DE LOS DIENTES' }] },

			{ hallazgo: 'sellante', estado: '', diagnostico: [{ id: 16203, codigo: 'K004', descripcion: 'ALTERACIONES EN LA FORMACIÓN DENTARIA' }] },
			{ hallazgo: 'ok', estado: '', diagnostico: [{ id: 24242, codigo: 'Z012', descripcion: 'EXAMEN ODONTOLÓGICO' }] },
			{ hallazgo: 'diastema', estado: '-r', diagnostico: [{ id: 16253, codigo: 'K073', descripcion: 'ANOMALIAS DE LA POSICION DEL DIENTE' }] },
			{ hallazgo: 'corona', estado: '-r', diagnostico: [{ id: 16226, codigo: 'K038', descripcion: 'OTRAS ENFERMEDADES ESPECIFICADAS DE LOS TEJIDOS DUROS DE LOS DIENTES' }] },
			{ hallazgo: 'endodoncia', estado: '-r', diagnostico: [{ id: 16228, codigo: 'K040', descripcion: 'PULPITIS' }, { id: 16229, codigo: 'K041', descripcion: 'NECROSIS DE LA PULPA' }] },
			{
				hallazgo: 'exodoncia', estado: '-r', diagnostico: [
					{ id: 16213, codigo: 'K022', descripcion: 'CARIES DEL CEMENTO' },
					{ id: 19659, codigo: 'S025', descripcion: 'FRACTURA DE DIENTES' },
					{ id: 16229, codigo: 'K041', descripcion: 'NECROSIS DE LA PULPA' },
					{ id: 16253, codigo: 'K073', descripcion: 'ANOMALIAS DE LA POSICION DEL DIENTE' },
					{ id: 16262, codigo: 'K083', descripcion: 'RAIZ DENTAL RETENIDA' },
					{ id: 16240, codigo: 'K052', descripcion: 'PERIODONTITIS AGUDA' },
					{ id: 16241, codigo: 'K053', descripcion: 'PERIODONTITIS CRONICA' },
					{ id: 16243, codigo: 'K055', descripcion: ' OTRAS ENFERMEDADES PERIODONTALEs' }]
			},
			{
				hallazgo: 'exodonciaQx', estado: '-r', diagnostico: [{ id: 16209, codigo: 'K010', descripcion: 'DIENTES INCLUIDOS' },
				{ id: 16210, codigo: 'K011', descripcion: 'DIENTES IMPACTADOS' },
				{ id: 16213, codigo: 'K022', descripcion: 'CARIES DEL CEMENTO' },
				{ id: 16262, codigo: 'K083', descripcion: 'RAIZ DENTAL RETENIDA' }]
			},
			{
				hallazgo: 'exodoncia', estado: '', diagnostico: [{ id: 16248, codigo: 'K068', descripcion: 'OTROS TRASTORNOS ESPECIFICADOS DE LA ENCIA Y DE LA ZONA EDENTULA' },]
			},
			{
				hallazgo: 'exodonciaQx', estado: '', diagnostico: [{ id: 16248, codigo: 'K068', descripcion: 'OTROS TRASTORNOS ESPECIFICADOS DE LA ENCIA Y DE LA ZONA EDENTULA' }]
			},
			{ hallazgo: 'fractura', estado: '-r', diagnostico: [{ id: 19659, codigo: 'S025', descripcion: 'FRACTURA DE LOS DIENTES' }] },

			{
				hallazgo: 'incrustacion', estado: '-r', diagnostico: [{ id: 16212, codigo: 'K021', descripcion: 'CARIES DE LA DENTINA' },
				{ id: 16213, codigo: 'K022', descripcion: 'CARIES DEL CEMENTO' },
				{ id: 16216, codigo: 'K028', descripcion: 'OTRAS CARIES DENTALES' },
				{ id: 16217, codigo: 'K029', descripcion: 'CARIES DENTAL, NO ESPECIFICADA' },
				{ id: 16226, codigo: 'K038', descripcion: 'OTRAS ENFERMEDADES ESPECIFICADAS DE LOS TEJIDOS DUROS DE LOS DIENTES' }]
			},

			{ hallazgo: 'mbs', estado: '-r', diagnostico: [{ id: 16211, codigo: 'K020', descripcion: 'CARIES LIMITADA AL ESMALTE (MANCHA BLANCA)' }] },
			{ hallazgo: 'mbh', estado: '-r', diagnostico: [{ id: 16211, codigo: 'K020', descripcion: 'CARIES LIMITADA AL ESMALTE (MANCHA BLANCA)' }] },

			{ hallazgo: 'numerario', estado: '-r', diagnostico: [{ id: 16200, codigo: 'K001', descripcion: 'DIENTES SUPERNUMERARIOS' }] },
			{
				hallazgo: 'obturacion', estado: '-r', diagnostico: [
					{ id: 16212, codigo: 'K021', descripcion: 'CARIES DE LA DENTINA' },
					{ id: 16213, codigo: 'K022', descripcion: 'CARIES DEL CEMENTO' },
					{ id: 16216, codigo: 'K028', descripcion: 'OTRAS CARIES DENTALES' },
					{ id: 16217, codigo: 'K029', descripcion: 'CARIES DENTAL, NO ESPECIFICADA' },
					{ id: 16226, codigo: 'K038', descripcion: 'OTRAS ENFERMEDADES ESPECIFICADAS DE LOS TEJIDOS DUROS DE LOS DIENTES' }]
			},

			{ hallazgo: 'pontico', estado: '-r', diagnostico: [{ id: 16226, codigo: 'K038', descripcion: 'OTRAS ENFERMEDADES ESPECIFICADAS DE LOS TEJIDOS DUROS DE LOS DIENTES' }] },
			{ hallazgo: 'pontico', estado: '', diagnostico: [{ id: 16226, codigo: 'K038', descripcion: 'OTRAS ENFERMEDADES ESPECIFICADAS DE LOS TEJIDOS DUROS DE LOS DIENTES' }] },
			{ hallazgo: 'resina', estado: '', diagnostico: [{ id: 16203, codigo: 'K004', descripcion: 'ALTERACIONES EN LA FORMACIÓN DENTARIA' }] },
			{
				hallazgo: 'resina', estado: '-r', diagnostico: [{ id: 16212, codigo: 'K021', descripcion: 'CARIES DE LA DENTINA' },
				{ id: 16213, codigo: 'K022', descripcion: 'CARIES DEL CEMENTO' },
				{ id: 16216, codigo: 'K028', descripcion: 'OTRAS CARIES DENTALES' },
				{ id: 16217, codigo: 'K029', descripcion: 'CARIES DENTAL, NO ESPECIFICADA' },
				{ id: 16226, codigo: 'K038', descripcion: 'OTRAS ENFERMEDADES ESPECIFICADAS DE LOS TEJIDOS DUROS DE LOS DIENTES' },
				{ id: 19659, codigo: 'S025', descripcion: 'FRACTURA DE LOS DIENTES' }]
			},

			{ hallazgo: 'rr', estado: '-r', diagnostico: [{ id: 16262, codigo: 'K083', descripcion: 'RAIZ DENTAL RETENIDA' }] },
			{ hallazgo: 'rre', estado: '-r', diagnostico: [{ id: 16262, codigo: 'K083', descripcion: 'RAIZ DENTAL RETENIDA' }] },

			{ hallazgo: 'sellante', estado: '-r', diagnostico: [{ id: 16204, codigo: 'K005', descripcion: 'ALTERACIONES HEREDITARIAS DE LA ESTRUCTURA DENTARIA, NO CLASIFICADAS EN OTRA PARTE' }] },
			{ hallazgo: 'icdas3', estado: '-r', diagnostico: [{ id: 16212, codigo: 'K021', descripcion: 'CARIES DE LA DENTINA' }] },
			{ hallazgo: 'icdas4', estado: '-r', diagnostico: [{ id: 16212, codigo: 'K021', descripcion: 'CARIES DE LA DENTINA' }] },
			{ hallazgo: 'icdas5', estado: '-r', diagnostico: [{ id: 16212, codigo: 'K021', descripcion: 'CARIES DE LA DENTINA' }] },
			{ hallazgo: 'icdas6', estado: '-r', diagnostico: [{ id: 16212, codigo: 'K021', descripcion: 'CARIES DE LA DENTINA' }] },
		]

		this.hallazgoCups = [
			{ hallazgo: 'corona', estado: '', cup: [{ codigo: '234105', descripcion: 'INSERCIÓN O APLICACIÓN DE CORONA' }] },
			{ hallazgo: 'endodoncia', estado: '', cup: [{ codigo: '237306', descripcion: 'TERAPIA DE CONDUCTO RADICULAR' }] },
			{ hallazgo: 'incrustacion', estado: '', cup: [{ codigo: '233100', descripcion: 'RESTAURACIÓN DE DIENTES MEDIANTE INCRUSTACIÓN METÁLICA SOD' }, { codigo: '233200', descripcion: 'RESTAURACIÓN DE DIENTES MEDIANTE INCRUSTACIÓN NO METÁLICA SOD' }] },
			{ hallazgo: 'obturaciont', estado: '', cup: [{ codigo: '232200', descripcion: 'OBTURACION TEMPORAL POR DIENTE SOD' }] },
			{
				hallazgo: 'obturacionok', estado: '', cup: [{ codigo: '232101', descripcion: 'OBTURACIÓN DENTAL CON AMALGAMA' },
				{ codigo: '232102', descripcion: 'OBTURACIÓN DENTAL CON RESINA DE FOTOCURADO' },
				{ codigo: '232103', descripcion: 'OBTURACIÓN DENTAL CON IONÓMERO DE VIDRIO' }]
			},
			{
				hallazgo: 'radiografia', estado: '', cup: [{ codigo: '870451', descripcion: 'RADIOGRAFÍAS INTRAORALES PERIAPICALES DIENTES ANTERIORES SUPERIORES ' },
				{ codigo: '870452', descripcion: 'RADIOGRAFÍAS INTRAORALES PERIAPICALES DIENTES ANTERIORES INFERIORES' },
				{ codigo: '870453', descripcion: 'RADIOGRAFÍAS INTRAORALES PERIAPICALES ZONA DE CANINOS' },
				{ codigo: '870454', descripcion: 'RADIOGRAFÍAS INTRAORALES PERIAPICALES PREMOLARES' },
				{ codigo: '870455', descripcion: ' RADIOGRAFÍAS INTRAORALES PERIAPICALES MOLARES' }
				]
			},
			{
				hallazgo: 'restauracion', estado: '', cup: [{ codigo: '232102', descripcion: 'OBTURACIÓN DENTAL CON RESINA DE FOTOCURADO' },
				{ codigo: '232103', descripcion: 'OBTURACIÓN DENTAL CON IONÓMERO DE VIDRIO' }]
			},
			{
				hallazgo: 'sellante', estado: '', cup: [{ codigo: '997102', descripcion: 'APLICACIÓN DE SELLANTES DE FOTOCURADO' }]
			},
			{
				hallazgo: 'exodoncia', estado: '', cup: [{ codigo: '230101', descripcion: 'EXODONCIA DE DIENTE PERMANENTE UNIRRADICULAR' },
				{ codigo: '230102', descripcion: 'EXODONCIA DE DIENTE PERMANENTE MULTIRRADICULAR ' },
				{ codigo: '230201', descripcion: 'EXODONCIA DE DIENTE TEMPORAL UNIRRADICULAR' },
				{ codigo: '230202', descripcion: 'EXODONCIA DE DIENTE TEMPORAL MULTIRRADICULAR' },]
			},
			{
				hallazgo: 'exodonciaQx', estado: '', cup: [{ codigo: '231100', descripcion: 'EXODONCIA QUIRÚRGICA UNIRRADICULAR SOD' },
				{ codigo: '231200', descripcion: 'EXODONCIA QUIRÚRGICA MULTIRRADICULAR SOD' },
				{ codigo: '231303', descripcion: 'EXODONCIA DE DIENTE INCLUIDO' },]
			},
			{
				hallazgo: 'resina', estado: '', cup: [{ codigo: '997105', descripcion: 'APLICACIÓN DE RESINA PREVENTIVA' }]
			},
		]
	}

	/** obtener historico de odontograma */
	obtenerDientePacienteId(pacienteId: number, edad) {
		var swAdulto = false;
		this.http.get<Array<Diente>>(this._baseUrlHc + '/api/Odontologia/ObtenerUltimoOdontograma?PacienteId=' + pacienteId, { responseType: "json" }).subscribe(
			(data) => {
				this.dientes = data;
				data.forEach(e => {
					if (e.id < 51) {
						//Adulto
						swAdulto = true;
					} else {
						//Niño
						swAdulto = false;
					}

					e.hallazgos.forEach(x => {

						let eventocop = this.eventosCOP.find(c => c.hallazgo.toUpperCase() === x.evento.toUpperCase());
						if (eventocop != null) {
							if (x.evento == 'extraido' && x.diagnostico == 'K029') {
								this.eventoCOPCEO(e.id, eventocop, swAdulto);
							} else if (x.evento != 'extraido') {
								this.eventoCOPCEO(e.id, eventocop, swAdulto);
							}
						}
					});
				});
			},
			(error) => {
				
				this.dientes = [];
				this.colocarEventosDientes(edad);
			}
		);
	}

	/**armar los eventos en los dientes de algun historico */
	obtenerEventosDiente(id: number): Diente {
		/**se valida diente por diente si tiene algun evento */
		var a = this.dientes.find(c => c.id === id);
		if (a == undefined || a == null) {
			return { id: id, hallazgos: [] };
		}
		else
			return a;
	}

	colocarEventosDientes(edad) {

		if (edad > 15) {
			this.dientes.push({ id: 55, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 54, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 53, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 52, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 51, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 61, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 62, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 63, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 64, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 65, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 85, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 84, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 83, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 82, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 81, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 71, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 72, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 73, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 74, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
			this.dientes.push({ id: 75, hallazgos: [{ evento: 'extraido', cara: 1, estado: "", diagnostico: "K007" }] });
		} else {
			this.dientes.push({ id: 11, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 12, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 13, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 14, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 15, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 16, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 17, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 18, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 21, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 22, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 23, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 24, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 25, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 26, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 27, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 28, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });

			this.dientes.push({ id: 41, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 42, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 43, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 44, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 45, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 46, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 47, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 48, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });

			this.dientes.push({ id: 31, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 32, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 33, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 34, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 35, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 36, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 37, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
			this.dientes.push({ id: 38, hallazgos: [{ evento: 'erupcionar', cara: 1, estado: "", diagnostico: "" }] });
		}
	}

	/**cuando se coloca el evento en una de las cara del diente, se llama desde diente-visualizacion.component.ts */
	cambiarCaraDiente(cara: number, diente: number, content) {
		this.cara = cara;
		this.diente = diente;
		if (this.eventos != "") {

			if (this.caras.includes(cara)) {
				this.agregarHallazgoDiente(this.diente, this.eventos, this.cara, this.estado, content);
			} else if (this.caras.includes(0)) {
				this.cara = 0;
				this.agregarHallazgoDiente(this.diente, this.eventos, 1, this.estado, content);
			}
			else {
				Swal.fire("Advertencia", "La Cara No." + this.cara + " no es válida para este evento", 'warning');
			}
		} else {
			Swal.fire("Advertencia", "No ha seleccionada ningun evento", 'warning');
		}
	}

	agregarHallazgoDiente(diente: number, evento: string, cara: number, estado: string, content) {

		this.dienteSeleccionado = { diente: diente, evento: evento, cara: cara, estado: estado };
		this.diagnosticoEncontrado = null;
		this.cupEncontrado = null;
		this.eventoCup = null;
		var eventocop = null;
		var a = this.dientes.findIndex(c => c.id === diente);
		this.diagnosticoEncontrado = this.hallazgoDiagnostico.find(c => c.hallazgo.toUpperCase() === evento.toUpperCase() && c.estado === estado);
		this.cupEncontrado = this.hallazgoCups.find(c => c.hallazgo.toUpperCase() === evento.toUpperCase() && c.estado === estado);
		eventocop = this.eventosCOP.find(c => c.hallazgo.toUpperCase() === evento.toUpperCase());
		var swAdulto = false;
		if (diente < 51) {
			//Adulto
			swAdulto = true;
		} else {
			//Niño
			swAdulto = false;
		}


		/**Cuando no existe eventos en el diente */
		if (a == -1) {
			//this.dientes.push({ id: diente, hallazgos: [{ evento: evento, cara: cara, estado: estado, diagnostico: '' }] });
			let cup = new VMCup();
			var listacup = [];
			var listadiagn = [];
			let diagnostico = new VMDiagnosticoOdontologico();
			var codigoDiag = '';
			/* DIAGNOSTICO */
			/**Para saber si ese evento tiene diagnosticos asociado */
			try {
				if (this.diagnosticoEncontrado != undefined) {
					/**Si solo tiene un diagnostico simplemente ese se selecciona automaticamente, sin preguntarle al doc cual elegir */
					if (this.diagnosticoEncontrado.diagnostico.length == 1) {
						diagnostico.id = this.diagnosticoEncontrado.diagnostico[0].id;
						diagnostico.diente = diente;
						diagnostico.cara = cara;
						diagnostico.evento = evento;
						diagnostico.codigo = this.diagnosticoEncontrado.diagnostico[0].codigo;
						diagnostico.descripcion = this.diagnosticoEncontrado.diagnostico[0].descripcion;
						diagnostico.odontograma = true;

						codigoDiag = this.diagnosticoEncontrado.diagnostico[0].codigo;

						listadiagn.push(diagnostico);
						this.impDiagnostico.diagnosticos.push(diagnostico);
						/** Solo los eventos de color rojos, iran al ordenamientos */
						if (this.estado == '-r') {
							this.cargarDatosOrdenamiento(cup, cara, diente, listacup, listadiagn, diagnostico, evento);
						}
						/**Si ese evento no esta dentro del listado de eventos cariado, obsturados, perdidos */
						if (eventocop != null) {
							this.eventoCOPCEO(diente, eventocop, swAdulto);
						}
					} else {
						/**Si hay más de un diagnostico asociado a ese evento, se le muestra un  modal para que el medico seleccione cual quiere */
						if (this.diagnosticoEncontrado.diagnostico.length > 1) {
							this.modal = this.modalService.open(content, { backdrop: 'static', keyboard: false, centered: true });

							/**El resultado de la seleccion en el modal */
							this.modal.result.then(res => {

								if (res != null) {
									codigoDiag = res.codigo;

									/** Solo los eventos de color rojos, iran al ordenamientos */
									if (this.estado == '-r') {
										listadiagn.push(res);
										this.cargarDatosOrdenamiento(cup, cara, diente, listacup, listadiagn, res, evento);
									}
									/**Si ese evento no esta dentro del listado de eventos cariado, obsturados, perdidos y si es un diente perdido por ortodoncia*/
									if (eventocop != null && res.codigo != "K081") {
										this.eventoCOPCEO(diente, eventocop, swAdulto);
									}
								} else {
									codigoDiag = "K007";
								}

								/**Buscar el diente para add el diagnostico */
								var c = this.dientes.findIndex(c => c.id === diente);
								if (c >= 0) {
									var z = this.dientes[c].hallazgos.findIndex(x => x.evento === evento && x.cara === cara && x.estado === estado);
									if (z >= 0) {
										this.dientes[c].hallazgos[z].diagnostico = codigoDiag
									}
								}
								/**End Buscar Diente y add diagnostico */

							}, dismiss => {
							})

						}
					}
				}
			} catch (error) {
			}

			/**IMPORTANTE SE AGREGA EL DIENTE AL ARRAY */
			this.dientes.push({ id: diente, hallazgos: [{ evento: evento, cara: cara, estado: estado, diagnostico: codigoDiag }] });
			/*END DIAGNOSTICO */
		}
		else {

			/**Cuando existe ya un evento sobre ese diente*/
			var b = this.dientes[a].hallazgos.findIndex(x => x.evento === evento && x.cara === cara && x.estado === estado);
			/** se busca el evento en la cara y con cual estado se encuentra y si no se encuentra  se agrega */
			if (b == -1) {
				//this.dientes[a].hallazgos.push({ evento: evento, cara: cara, estado: estado, diagnostico: '' });
				let cup = new VMCup();
				var listacup = [];
				var listadiagn = [];
				let diagnostico = new VMDiagnosticoOdontologico();
				var codigoDiag = '';

				/* DIAGNOSTICO */
				try {
					if (this.diagnosticoEncontrado != undefined) {
						if (this.diagnosticoEncontrado.diagnostico.length == 1) {
							diagnostico.id = this.diagnosticoEncontrado.diagnostico[0].id;
							diagnostico.diente = diente;
							diagnostico.cara = cara;
							diagnostico.evento = evento;
							diagnostico.codigo = this.diagnosticoEncontrado.diagnostico[0].codigo;
							diagnostico.descripcion = this.diagnosticoEncontrado.diagnostico[0].descripcion;
							diagnostico.odontograma = true;
							
							codigoDiag = this.diagnosticoEncontrado.diagnostico[0].codigo;

							listadiagn.push(diagnostico);
							this.impDiagnostico.diagnosticos.push(diagnostico);
							/** Solo los eventos de color rojos, iran al ordenamientos */
							if (this.estado == '-r') {
								this.cargarDatosOrdenamiento(cup, cara, diente, listacup, listadiagn, diagnostico, evento);
							}
							/**Si ese evento no esta dentro del listado de eventos cariado, obsturados, perdidos */
							if (eventocop != null) {
								this.eventoCOPCEO(diente, eventocop, swAdulto);
							}
						} else {
							this.modal = this.modalService.open(content, { backdrop: 'static', keyboard: false, centered: true });
							this.modal.result.then(res => {

								if (res != null) {
									codigoDiag = res.codigo;

									/** Solo los eventos de color rojos, iran al ordenamientos */
									if (this.estado == '-r') {
										listadiagn.push(res);
										this.cargarDatosOrdenamiento(cup, cara, diente, listacup, listadiagn, res, evento);
									}
									/**Si ese evento no esta dentro del listado de eventos cariado, obsturados, perdidos */
									if (eventocop != null && res.codigo != "K081") {
										this.eventoCOPCEO(diente, eventocop, swAdulto);
									}

								} else {
									codigoDiag = "K007";
								}

								/**Buscar el diente para add el diagnostico */
								var c = this.dientes.findIndex(c => c.id === diente);
								if (c >= 0) {
									var z = this.dientes[c].hallazgos.findIndex(x => x.evento === evento && x.cara === cara && x.estado === estado);
									if (z >= 0) {
										this.dientes[c].hallazgos[z].diagnostico = codigoDiag
									}
								}
								/**End Buscar Diente y add diagnostico */
							}, dismiss => {
							})
						}
					}
				} catch (error) {
				}

				/**IMPORTANTE SE AGREGA EL DIENTE AL ARRAY */
				this.dientes[a].hallazgos.push({ evento: evento, cara: cara, estado: estado, diagnostico: codigoDiag });
				/*END DIAGNOSTICO */
			} else {

				//this.dientes[a].hallazgos.splice(b, 1);

				var indicador = this.indicadorCOPCEO.findIndex(c => c.diente === diente);
				try {
					var posicionDiag = this.impDiagnostico.diagnosticos.findIndex(x => x.diente === diente && x.cara === cara && x.evento === evento);
					if (posicionDiag != -1) {
						/**Cuando es un extraido por erupcion dentaria K007 este nuna entraria aqui porque ese no se guarda en los diagnosticos
						 * por eso solo se valida que sea diferente a K081 ya que solo debe dejar pasar K029
						 */
						if (eventocop != null && this.impDiagnostico.diagnosticos[posicionDiag].codigo != "K081") {
							if (eventocop.tipo == 'P') {
								if (swAdulto) {
									this.indicadorCOPCEO[indicador].indiceCOP.perdido = this.indicadorCOPCEO[indicador].indiceCOP.perdido - 1;
								} else {
									this.indicadorCOPCEO[indicador].indiceCEO.perdido = this.indicadorCOPCEO[indicador].indiceCEO.perdido - 1;
								}
							}
						}
						this.impDiagnostico.diagnosticos.splice(posicionDiag, 1);
					} else {
						/** Aca se coloca esto por si es un diente que viene de historico y no tiene diagnostico
						 * pero se debe validar tambien los K007 ya que aqui si puede ingresar
						 */
						if (eventocop != null && this.dientes[a].hallazgos[b].diagnostico != "K081" && this.dientes[a].hallazgos[b].diagnostico != "K007") {
							if (eventocop.tipo == 'P') {
								if (swAdulto) {
									this.indicadorCOPCEO[indicador].indiceCOP.perdido = this.indicadorCOPCEO[indicador].indiceCOP.perdido - 1;
								} else {
									this.indicadorCOPCEO[indicador].indiceCEO.perdido = this.indicadorCOPCEO[indicador].indiceCEO.perdido - 1;
								}
							}
						}
					}
				} catch (error) {
				}

				if (eventocop != null) {
					if (swAdulto) {
						if (eventocop.tipo == 'O') {
							this.indicadorCOPCEO[indicador].indiceCOP.obsturado = this.indicadorCOPCEO[indicador].indiceCOP.obsturado - 1;
						} else if (eventocop.tipo == 'C') {
							this.indicadorCOPCEO[indicador].indiceCOP.cariado = this.indicadorCOPCEO[indicador].indiceCOP.cariado - 1;
						} else if (eventocop.tipo == 'CN') {
							this.indicadorCOPCEO[indicador].indiceCOP.cariadoN = this.indicadorCOPCEO[indicador].indiceCOP.cariadoN - 1;
						} else if (eventocop.tipo == 'S') {
							this.indicadorCOPCEO[indicador].indiceCOP.sano = this.indicadorCOPCEO[indicador].indiceCOP.sano - 1;
						}
					} else {
						if (eventocop.tipo == 'O') {
							this.indicadorCOPCEO[indicador].indiceCEO.obsturado = this.indicadorCOPCEO[indicador].indiceCEO.obsturado - 1;
						} else if (eventocop.tipo == 'C') {
							this.indicadorCOPCEO[indicador].indiceCEO.cariado = this.indicadorCOPCEO[indicador].indiceCEO.cariado - 1;
						} else if (eventocop.tipo == 'CN') {
							this.indicadorCOPCEO[indicador].indiceCEO.cariadoN = this.indicadorCOPCEO[indicador].indiceCEO.cariadoN - 1;
						} else if (eventocop.tipo == 'S') {
							this.indicadorCOPCEO[indicador].indiceCEO.sano = this.indicadorCOPCEO[indicador].indiceCEO.sano - 1;
						}
					}

				}


				/**Si no se encuentra se elimina */
				this.dientes[a].hallazgos.splice(b, 1);

				var s = this.conductaCup.ListadoOrdenamiento.findIndex(x => x.diente === diente && x.cara === cara && x.evento === evento);
				if (s != -1) {
					this.conductaCup.ListadoOrdenamiento.splice(s, 1);
				}
				var d = this.evolu.eventos.findIndex(x => x.diente === diente && x.cara === cara && x.evento === evento);
				if (s != -1) {
					this.evolu.eventos.splice(d, 1);
				}
			}
		}
	}


	eventoCOPCEO(diente: number, eventoCOP, swAdulto) {

		var a = this.indicadorCOPCEO.findIndex(c => c.diente === diente);
		var obt = 0;
		var carieN = 0;
		var sano = 0;
		var carie = 0;
		var perdido = 0;

		if (a == -1) {
			obt = eventoCOP.tipo == 'O' ? 1 : 0;
			carie = eventoCOP.tipo == 'C' ? 1 : 0;
			carieN = eventoCOP.tipo == 'CN' ? 1 : 0;
			sano = eventoCOP.tipo == 'S' ? 1 : 0;
			perdido = eventoCOP.tipo == 'P' ? 1 : 0;

			var indAdulto = new Indicador();
			var indNino = new Indicador();

			if (swAdulto) {
				indAdulto.obsturado = obt;
				indAdulto.cariado = carie;
				indAdulto.cariadoN = carieN;
				indAdulto.sano = sano;
				indAdulto.perdido = perdido;
			} else {
				indNino.obsturado = obt;
				indNino.cariado = carie;
				indNino.cariadoN = carieN;
				indNino.sano = sano;
				indNino.perdido = perdido;

			}

			this.indicadorCOPCEO.push({ 'diente': diente, 'indiceCOP': indAdulto, 'indiceCEO': indNino })

		} else {
			var b = this.indicadorCOPCEO[a];
			if (swAdulto) {
				if (eventoCOP.tipo == 'O') {
					b.indiceCOP.obsturado = b.indiceCOP.obsturado + 1;
				} else if (eventoCOP.tipo == 'C') {
					b.indiceCOP.cariado = b.indiceCOP.cariado + 1;
				} else if (eventoCOP.tipo == 'P') {
					b.indiceCOP.perdido = b.indiceCOP.perdido + 1;
				} else if (eventoCOP.tipo == 'CN') {
					b.indiceCOP.cariadoN = b.indiceCOP.cariadoN + 1;
				} else if (eventoCOP.tipo == 'S') {
					b.indiceCOP.sano = b.indiceCOP.sano + 1;
				}
			} else {
				if (eventoCOP.tipo == 'O') {
					b.indiceCEO.obsturado = b.indiceCEO.obsturado + 1;
				} else if (eventoCOP.tipo == 'C') {
					b.indiceCEO.cariado = b.indiceCEO.cariado + 1;
				} else if (eventoCOP.tipo == 'P') {
					b.indiceCEO.perdido = b.indiceCEO.perdido + 1;
				} else if (eventoCOP.tipo == 'CN') {
					b.indiceCEO.cariadoN = b.indiceCEO.cariadoN + 1;
				} else if (eventoCOP.tipo == 'S') {
					b.indiceCEO.sano = b.indiceCEO.sano + 1;
				}
			}
		}
	}

	capturarIndicador() {
		//console.log(this.indicadorCOPCEO);

		var total = 0;
		var adulto = false;
		/**Para saber si es una boca adulta */
		this.dientes.forEach(e => {
			var l = e.hallazgos.filter(z => z.evento != 'erupcionar');
			if (l.length > 0) {
				if (this.odontoServices.numeroDientesAdulto.includes(e.id)) {
					adulto = true;
				}
			}
		});
		/**Para obtener el total de dientes en boca */
		this.dientes.forEach(x => {
			var l = x.hallazgos.filter(z => z.evento != 'extraido' && z.evento != 'erupcionar');
			if (l.length > 0) {
				total = total + 1;
			}
		})
		var faltante = 0;
		if (this.dientes.length < 52) {
			faltante = 52 - this.dientes.length;
		}

		if (adulto) {
			this.indicadores.indicadorCOP.totalDienteBoca = total + faltante;
		}




		this.indicadorCOPCEO.forEach(x => {

			if (x.indiceCOP.cariado > 0 && x.indiceCOP.cariadoN > 0 && x.indiceCOP.obsturado > 0) {
				this.indicadores.indicadorCOP.cariado = this.indicadores.indicadorCOP.cariado + 1;
			} else if (x.indiceCOP.cariado > 0 && x.indiceCOP.obsturado > 0) {
				this.indicadores.indicadorCOP.cariado = this.indicadores.indicadorCOP.cariado + 1;
			} else if (x.indiceCOP.cariadoN > 0 && x.indiceCOP.obsturado > 0) {
				this.indicadores.indicadorCOP.cariadoNoCavitacional = this.indicadores.indicadorCOP.cariadoNoCavitacional + 1;
			} else if (x.indiceCOP.cariado > 0) {
				this.indicadores.indicadorCOP.cariado = this.indicadores.indicadorCOP.cariado + 1;
			} else if (x.indiceCOP.cariadoN > 0) {
				this.indicadores.indicadorCOP.cariadoNoCavitacional = this.indicadores.indicadorCOP.cariadoNoCavitacional + 1;
			} else if (x.indiceCOP.obsturado > 0) {
				this.indicadores.indicadorCOP.obsturado = this.indicadores.indicadorCOP.obsturado + 1;
			}

			if (x.indiceCOP.perdido > 0) {
				this.indicadores.indicadorCOP.perdido = this.indicadores.indicadorCOP.perdido + 1;
			}
			if (x.indiceCOP.sano > 0) {
				this.indicadores.indicadorCOP.sano = this.indicadores.indicadorCOP.sano + 1;
			}


			if (x.indiceCEO.cariado > 0 && x.indiceCEO.cariadoN > 0 && x.indiceCEO.obsturado > 0) {
				this.indicadores.indicadorCEO.cariado = this.indicadores.indicadorCEO.cariado + 1;
			} else if (x.indiceCEO.cariado > 0 && x.indiceCEO.obsturado > 0) {
				this.indicadores.indicadorCEO.cariado = this.indicadores.indicadorCEO.cariado + 1;
			} else if (x.indiceCEO.cariadoN > 0 && x.indiceCEO.obsturado > 0) {
				this.indicadores.indicadorCEO.cariadoNoCavitacional = this.indicadores.indicadorCEO.cariadoNoCavitacional + 1;
			} else if (x.indiceCEO.cariado > 0) {
				this.indicadores.indicadorCEO.cariado = this.indicadores.indicadorCEO.cariado + 1;
			} else if (x.indiceCEO.cariadoN > 0) {
				this.indicadores.indicadorCEO.cariadoNoCavitacional = this.indicadores.indicadorCEO.cariadoNoCavitacional + 1;
			} else if (x.indiceCEO.obsturado > 0) {
				this.indicadores.indicadorCEO.obsturado = this.indicadores.indicadorCEO.obsturado + 1;
			}

			if (x.indiceCEO.perdido > 0) {
				this.indicadores.indicadorCEO.exfoliado = this.indicadores.indicadorCEO.exfoliado + 1;
			}

			if (x.indiceCEO.sano > 0) {
				this.indicadores.indicadorCEO.sano = this.indicadores.indicadorCEO.sano + 1;
			}
		});

		this.indicadores.CalcularTotalCOPCEO();

	}

	cargarDatosOrdenamiento(cup, cara, diente, listacup, listadiagn, diagnostico, evento) {

		const idRandom = this.odontoServices.generarIdNoRepetido();

		this.conductaCup.ListadoOrdenamiento.push({
			cup: cup,
			diagnostico: diagnostico,
			tipo: "",
			nota: "",
			cara: cara,
			diente: diente,
			listadoCup: this.cupEncontrado == null ? null : this.cupEncontrado.cup,
			listadoCupsTableSeleccionados: listacup,
			listadoDiagnosticoTableSeleccionados: listadiagn,
			cantidad: 1,
			evento: evento,
			fechaCreacion: new Date,
			fechaVencimiento: new Date,
			idRandom: idRandom,
			swCirugia: false,
			check: false,
			swPropio: false,
			swRequierePreanestesiologia: false,
			ordenCx: null,
			grupo: 0,
			fechaProximoControl: new Date
		});

		if (this.esControl) {
			this.evolu.eventos.push({ fecha: new Date().toISOString().substr(0, 10), cara: cara, diagnostico: diagnostico, diente: diente, cup: cup, observacion: '', profesional: this.med.medico, cantidad: 1, evento: evento });
		}

	}
}

/* this.indicadores.obtenerHistoricoOdontrogramaPacienteId(pacienteId).subscribe(
	(data) => {
		if (data == null) {
			if (this.dientes.length > 0) {
				this.dientes.forEach(e => {
					e.hallazgos.forEach(x => {
						var eventt = this.eventosCOP.find(c => c.hallazgo.toUpperCase() === x.evento.toUpperCase());

						if (eventt != null) {
							if (eventt.tipo == 'O') {
								this.indicadores.indicadorCOP.obsturado = this.indicadores.indicadorCOP.obsturado + 1;
							} else if (eventt.tipo == 'C') {
								this.indicadores.indicadorCOP.cariado = this.indicadores.indicadorCOP.cariado + 1;
							} else if (eventt.tipo == 'P') {
								this.indicadores.indicadorCOP.perdido = this.indicadores.indicadorCOP.perdido + 1;
							}
						}
					});
				});
			} else {
				this.indicadores.indicadorCOP = new Indice();
			}
		} else {
			this.indicadores.indicadorCOP = data;
		}
	},
	(error) => {
		this.indicadores.indicadorCOP = new Indice();
	}
);  */
