import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TamizajeSaludBucal } from '../Modelos/Adolescencia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TamizajeSaludBucalService {
  recomendaciones: string;
  recomendaciones2: string;
  alerta: string;
  alertaSaludBucal: boolean;
  optionTrue: Array<string> = []

  public tamizaje: TamizajeSaludBucal;
  _baseUrlHC: string;
  _baseUrlPaciente: string;

  constructor(
    private http: HttpClient
    //@Inject('URLHc') baseUrlHc: string,
    //@Inject('URLPaciente') baseUrlPaciente: string
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseUrlPaciente = environment.URLPaciente;
    this.recomendaciones = '';
    this.recomendaciones2 = '';
    this.alerta = '';
    this.alertaSaludBucal = false;
    this.tamizaje = new TamizajeSaludBucal();
  }

}

