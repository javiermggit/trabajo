import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { RequestOptions, Headers } from '@angular/http';
import { delayedRetry } from 'src/app/pipes/reintentoApi';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LactanciaService {

  public datos2: any;
  
  conDatos: boolean = false;


  _baseUrlHC: string;
  _baseUrlPaciente: string;

  constructor(
    private http: HttpClient
    //@Inject('URLHc') baseUrlHc: string,
    //@Inject('URLPaciente') baseUrlPaciente: string
  ) {
    this._baseUrlHC = environment.URLHc;
    this._baseUrlPaciente = environment.URLPaciente;
    //this.ObtenerDatos()
  }



  //#region Combos
  ObtenerDatos(datosMarcardos) {
    return this.http.get<Array<any>>(this._baseUrlHC + '/api/Graficas/LactanciaMaterna?categoriaId=5&seleccionados=' + datosMarcardos, { responseType: "json" }).pipe(
      delayedRetry(10000, 100),
      catchError((e) => {
        
        
        console.log('intentando obtener LactanciaMaterna nuevamente...');
        return EMPTY
      })
    ).subscribe((responses) => {
      this.datos2 = responses;
    })
  }
}
