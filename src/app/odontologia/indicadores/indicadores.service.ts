import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Diente, Indicadorplaca, Indice, IndiceCEO } from 'src/app/Modelos/Odontologia';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class IndicadoresService {
	indicadorCOP: Indice;
	indicadorCEO: IndiceCEO;
	dientes: Diente[];
	dientesHistorial: Diente[];
	eventos: string;
	estado: string;
	cara: number;
	caras: number[] = [1, 2, 3, 4];
	diente: number;
	esControl: boolean = false;
	esUrgencia: boolean = false;
	esPrimeravez: boolean = false;
	esTelesalud: boolean = false;
	_baseUrlHc: string;
	dienteSeleccionado: any;

	modal: NgbModalRef;

	isCapturado: boolean = false;
	listIndicadores: Array<Indicadorplaca>;
	totalCOPCEO: string;

	constructor(
		private http: HttpClient,
		//@Inject('URLHc') baseUrlHc: string,
		private modalService: NgbModal
	) {
		this._baseUrlHc = environment.URLHc;
		this.dientes = [];
		this.dientesHistorial = [];
		this.listIndicadores = new Array<Indicadorplaca>();
		this.indicadorCOP = new Indice();
		this.indicadorCEO = new IndiceCEO();
	}

	obtenerHistoricoIndicadorPacienteId(pacienteId: number) {

		this.http.get<Array<Indicadorplaca>>(this._baseUrlHc + '/api/HistoricoOdontologia/ObtenerHistoricoIndicadorPlaca?PacienteId=' + pacienteId, { responseType: "json" }).subscribe(
			(data) => {

				this.listIndicadores = data;
			},
			(error) => {
				this.listIndicadores = [];
			}
		);
	}

	obtenerHistoricoIndicadorCOPPacienteId(pacienteId: number) {

		return this.http.get<Indice>(this._baseUrlHc + '/api/HistoricoOdontologia/ObtenerHistoricoIndicadorCOP?PacienteId=' + pacienteId, { responseType: "json" })
	}

	obtenerEventosDienteHistorial(id: number): Diente {
		var a = this.dientesHistorial.find(c => c.id === id);
		if (a == undefined || a == null) {
			return { id: id, hallazgos: [] };
		}
		else
			return a;
	}


	obtenerEventosDiente(id: number): Diente {
		var a = this.dientes.find(c => c.id === id);
		if (a == undefined || a == null) {
			return { id: id, hallazgos: [] };
		}
		else
			return a;
	}

	cambiarCaraDiente(cara: number, diente: number) {
		this.cara = cara;
		this.diente = diente;
		if (this.diente != 18 && this.diente != 28 && this.diente != 48 && this.diente != 38) {
			this.eventos = this.eventos == "" ? "placa" : this.eventos;
			if (this.caras.includes(cara)) {
				this.agregarHallazgoDiente(this.diente, this.eventos, this.cara);
			} else if (this.caras.includes(0)) {
				this.cara = 0;
				this.agregarHallazgoDiente(this.diente, this.eventos, 1);
			}
			else {
				Swal.fire("Advertencia", "La Cara No." + this.cara + " no es válida para este evento", 'warning');
			}
		}

	}

	agregarHallazgoDiente(diente: number, evento: string, cara: number) {
		this.dienteSeleccionado = { diente: diente, evento: evento, cara: cara };
		var a = this.dientes.findIndex(c => c.id === diente);
		if (a == -1) {
			this.dientes.push({ id: diente, hallazgos: [{ evento: evento, cara: cara, estado: "", diagnostico: "" }] });
		}
		else {
			var d = this.dientes[a].hallazgos.filter(x => x.evento == 'extraido');
			if (d.length == 0) {
				var b = this.dientes[a].hallazgos.findIndex(x => x.evento === evento && x.cara === cara);
				if (b == -1) {
					this.dientes[a].hallazgos.push({ evento: evento, cara: cara, estado: "", diagnostico: "" });
				} else {
					this.dientes[a].hallazgos.splice(b, 1);
				}
			}
		}
	}

	CalcularTotalCOPCEO() {
		
		var perdidoCEO = 0;
		var perdidoCOP = 0;
		perdidoCEO = this.indicadorCEO.exfoliado - this.indicadorCEO.extraidoOrtodoncia
		perdidoCOP = this.indicadorCOP.perdido - this.indicadorCOP.extraidoOrtodoncia

		var sano = this.indicadorCOP.sano + this.indicadorCEO.sano;
		var Nocav = this.indicadorCOP.cariadoNoCavitacional + this.indicadorCEO.cariadoNoCavitacional;
		var Nocariado = this.indicadorCOP.cariado + this.indicadorCEO.cariado;
		var obsturado = this.indicadorCOP.obsturado + this.indicadorCEO.obsturado;
		var perdido = perdidoCOP + perdidoCEO;


		var cSano = this.concatenar(sano + "")
		var cCariadoN = this.concatenar(Nocav + "")
		var ccariado = this.concatenar(Nocariado + "")
		var cobsturado = this.concatenar(obsturado + "")
		var cperdido = this.concatenar(perdido + "")

		var cTotal = (this.indicadorCOP.totalDienteBoca + "").length > 1 ? this.indicadorCOP.totalDienteBoca + "" : "0" + this.indicadorCOP.totalDienteBoca;


		this.totalCOPCEO = cSano + cCariadoN + ccariado + cobsturado + cperdido + cTotal;

	}

	concatenar(valor: string): string {
		if (valor.length > 1) {
			return valor;
		} else {
			return "0" + valor;
		}
	}
	/* 	CalcularTotalCEO() {
			var perdidoCEO = this.indicadorCEO.exfoliado - this.indicadorCEO.extraidoOrtodoncia
			//this.totalValorCEO = this.indicadorCEO.cariado + this.indicadorCEO.obsturado + perdido;
			var cSano = (this.indicadorCEO.sano + "").length > 1 ? this.indicadorCEO.sano + "" : "0" + this.indicadorCEO.sano;
			var cCariadoN = (this.indicadorCEO.cariadoNoCavitacional + "").length > 1 ? this.indicadorCEO.cariadoNoCavitacional + "" : "0" + this.indicadorCEO.cariadoNoCavitacional;
			var ccariado = (this.indicadorCEO.cariado + "").length > 1 ? this.indicadorCEO.cariado + "" : "0" + this.indicadorCEO.cariado;
			var cobsturado = (this.indicadorCEO.obsturado + "").length > 1 ? this.indicadorCEO.obsturado + "" : "0" + this.indicadorCEO.obsturado;
			var cperdido = (perdidoCEO + "").length > 1 ? perdidoCEO + "" : "0" + perdidoCEO;
			var cTotal = (this.indicadorCEO.totalDienteBoca + "").length > 1 ? this.indicadorCEO.totalDienteBoca + "" : "0" + this.indicadorCEO.totalDienteBoca;
			this.totalCEO = cSano + cCariadoN + ccariado + cobsturado + cperdido + cTotal;
		} */
}