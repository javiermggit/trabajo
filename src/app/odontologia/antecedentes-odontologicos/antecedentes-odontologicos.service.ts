import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AntecedenteOdontologico, ExamenEstomatologico, ExamenOclusal, HabitoOral, ExamenPulpar, ExamenPeriodontal, HabitosHigieneOral } from 'src/app/Modelos/Odontologia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AntecedentesOdontologicosService {
  _baseUrl = "";

  public examenEstomatologico: ExamenEstomatologico;
  public examenOclusal: ExamenOclusal;
  public habitoOral: HabitoOral;
  public habitosHigieneOral: HabitosHigieneOral;
  public examenPulpar: ExamenPulpar;
  //public examenDentariosOclusion: ExamenDentariosOclusion;
  public examenPeriodontal: ExamenPeriodontal;

  constructor(
    private http: HttpClient
    //@Inject('URLHc') baseUrlHc: string
  ) {
    this.examenEstomatologico = new ExamenEstomatologico();
    this.examenOclusal = new ExamenOclusal();
    this.habitoOral = new HabitoOral();
    this.habitosHigieneOral = new HabitosHigieneOral();
    this.examenPulpar = new ExamenPulpar();
    //this.examenDentariosOclusion = new ExamenDentariosOclusion();
    this.examenPeriodontal = new ExamenPeriodontal();

    this._baseUrl = environment.URLHc;
  }
}
