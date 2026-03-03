import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Especialidad, Citas } from 'src/app/Modelos/Medico';
import { catchError, EMPTY, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse, } from '@angular/common/http';
import { delayedRetry } from 'src/app/pipes/reintentoApi';

@Injectable({
  providedIn: 'root'
})
export class VistahcService {
 
   public listadoEspecialidad: Array<Especialidad> = [];
   private _baseUrlHC: string;
  constructor(
     private http: HttpClient,
       
   ) {
   
     this._baseUrlHC = environment.URLHc;     
    
   }
 

  ObtenerEspecialidad() {
    return this.http.get<Array<Especialidad>>(this._baseUrlHC + '/api/Historicos/EspecialidadesImpresion', { responseType: "json" });
  }
}
