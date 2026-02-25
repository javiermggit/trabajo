import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RevisionSistema, ExamenFisico } from 'src/app/Modelos/Modelos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenFisicoService {
  RevisionSistema: RevisionSistema;
  ExamenFisico: ExamenFisico;

  _baseUrlMedico: string;

  constructor(
    private http: HttpClient
    //@Inject('URLMedico') _baseUrlMedico: string
  ) {
    
    this.RevisionSistema = new RevisionSistema();
    this.ExamenFisico = new ExamenFisico();
    this._baseUrlMedico = environment.URLMedico;
  }

  ObtenerExamenFisico(pacienteID, citaID) {
    return this.http.get<any>(this._baseUrlMedico + '/api/ProfesionalAsociado/ObtenerDatosAntropomedicos?PacienteId='+pacienteID+'&CitaId='+citaID, { responseType: "json" })
  }



}
