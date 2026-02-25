import { Injectable, Inject } from '@angular/core';
import { Evolucion } from 'src/app/Modelos/Odontologia';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class EvolucionService {
	eventos: Array<Evolucion>;
	eventosControl: Array<Evolucion>;
	evolucion: Evolucion;
	_baseUrlHC: string;

	constructor(
		private http: HttpClient
		//@Inject('URLHc') baseUrlHC: string
	) {

		this._baseUrlHC = environment.URLHc;
		this.eventos = new Array<Evolucion>();
		this.eventosControl = new Array<Evolucion>();
		this.evolucion = new Evolucion();
	}

	obtenerEvolucionAnterior(id) {
		return this.http.get<any>(this._baseUrlHC + '/api/HistoricoOdontologia/HistoricoEvolucionOdontologica?PacienteId=' + id, { responseType: "json" })
			.subscribe((response) => {
				this.eventosControl = response;
			}, (error)=>{
			});
	}
}
