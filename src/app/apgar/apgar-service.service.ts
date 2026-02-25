import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { VMApgar } from '../Modelos/Adolescencia';
import { delayedRetry } from '../pipes/reintentoApi';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApgarServiceService {
  public datosMarcardosApgar: Array<any> = []
  puntajeTotal: number = 0;
  interpretacion: string = "";
  
  public datosApgar: any;
  _baseUrlHC: string;
  _baseUrlPaciente: string;

  constructor(
    private http: HttpClient
    //@Inject('URLHc') baseUrlHc: string,
    //@Inject('URLPaciente') baseUrlPaciente: string
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseUrlPaciente = environment.URLPaciente;
    this.datosApgar = [];
  }
  //#region Combos
  ObtenerDatos(datosMarcardos, edad) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    var datosmarcadose = [{
      id: 0,
      respuesta: 0
    }];
    return this.http.post<Array<any>>(this._baseUrlHC + '/api/Graficas/Apgar?categoriaId=6&edad=' + edad, datosmarcadose, httpOptions).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        console.log('intentando obtener APGAR nuevamente...');
        return EMPTY
      })
    ).subscribe((responses) => {
      this.datosApgar = responses;
    }, (error) => {

    })
  }


  
}

