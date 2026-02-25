import { Injectable, Inject } from '@angular/core';
import { Acompañante } from 'src/app/Modelos/Modelos';
import { HttpClient } from '@angular/common/http';
import { HistoricoAtencionPrimaria } from 'src/app/Modelos/ModelHistorico';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtencionPrimariaService {
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
    return this.http.get<Array<HistoricoAtencionPrimaria>>(this._baseUrlHC + '/api/Historicos/HistoricoAtencionPrimaria?PacienteId=' + pacienteID, { responseType: "json" })
  }


  ObtenerHistoricoAcompaniante(pacienteID) {
    return this.http.get<any>(this._baseUrlHC + '/api/Historicos/ObtenerUltimoAcompanantePaciente?PacienteId=' + pacienteID, { responseType: "json" })
  }

}
