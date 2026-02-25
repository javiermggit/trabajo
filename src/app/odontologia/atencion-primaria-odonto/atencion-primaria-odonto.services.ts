import { Injectable, Inject } from '@angular/core';
import { Acompañante } from 'src/app/Modelos/Modelos';

import { HttpClient } from '@angular/common/http';
//import { RequestOptions, Headers } from '@angular/http';
import { OdontologiaService } from '../odontologia.service';
import { DatosPacienteService } from 'src/app/datos-paciente/datos-paciente.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtencionPrimariaOdontoService {
  acompanante: Acompañante;
  ultimoAcompanante: Acompañante;
  motivo: string;
  ultimaEnfermedad: string;
  _baseUrlHC: string
  constructor(
    private http: HttpClient 
    //@Inject('URLHc') _baseUrlHC: string
  ) {

    this.acompanante = new Acompañante();
    this.ultimoAcompanante = new Acompañante();
    this.motivo = "";
    this.ultimaEnfermedad = "";
    this._baseUrlHC = environment.URLHc
  }


  ObtenerHistoricoMotivoConsulta(pacienteID) {
    return this.http.get<any>(this._baseUrlHC + '/api/HistoricoOdontologia/HistoricoAtencionPrimaria?PacienteId=' + pacienteID, { responseType: "json" })
  }

  


}