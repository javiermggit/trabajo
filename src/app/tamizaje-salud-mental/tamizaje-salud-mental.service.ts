import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { delayedRetry } from '../pipes/reintentoApi';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TamizajeSaludMentalService {
  public datosMarcardosSM: Array<any> = []
  interpretacion: string = "Normal";
  public datosSM: any;
  _baseUrlHC: string;
  _baseUrlPaciente: string;

  constructor(
    private http: HttpClient
    //@Inject('URLHc') baseUrlHc: string,
    //@Inject('URLPaciente') baseUrlPaciente: string
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseUrlPaciente = environment.URLPaciente;

    this.datosSM = [];
  }
  //#region Combos
  ObtenerDatosSM(datosMarcardos, tipo) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    var datosmarcadose = [{
      id: 0,
      respuesta: 0
    }];

    return this.http.post<Array<any>>(this._baseUrlHC + '/api/Graficas/TamizajeSaludMental?categoriaId=7&tipo=' + tipo, datosmarcadose, httpOptions).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        console.log('intentando obtener nuevamente...');
        return EMPTY
      })
    ).subscribe((responses) => {
      this.datosSM = responses;
      this.datosSM.forEach(x => {
        this.datosMarcardosSM.push({ 'id': x.padre.id, 'pregunta': x.padre.descripcion, 'respuesta': x.padre.valueSM });
      });
    }, (error) => {

    })
  }
}
