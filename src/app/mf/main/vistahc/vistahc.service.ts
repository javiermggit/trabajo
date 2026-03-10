import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Especialidad, Citas } from 'src/app/Modelos/Medico';
import { HttpClient } from '@angular/common/http';
import { VMPaciente } from 'src/app/Modelos/Modelos';

export type VistahcFiltro = any;

export type VistahcViewState = {
  filtro?: VistahcFiltro;
  citas?: Citas[];
  citasEti?: Citas[];
  citasCont?: Citas[];
  hcPage?: number;
  notasPage?: number;
  otrosPage?: number;
  hcPageSize?: number;
  notasPageSize?: number;
  otrosPageSize?: number;
  savedAt: number;
 
};

@Injectable({
  providedIn: 'root'
})
export class VistahcService {
 
   public listadoEspecialidad: Array<Especialidad> = [];
   public viewState: VistahcViewState | null = null;
   private _baseUrlHC: string;
   private _baseUrlPaciente: string;
   private _baseUrlparametrizacion:string;
  constructor(
     private http: HttpClient,
       
   ) {
     this._baseUrlPaciente = environment.URLPaciente;
     this._baseUrlHC = environment.URLHc;   
    this._baseUrlparametrizacion = environment.URLParametrizacion;   
     

    
   }
 

  ObtenerEspecialidad() {
    return this.http.get<Array<Especialidad>>(this._baseUrlparametrizacion + '/api/ParEspecialidades', { responseType: "json" });
  }

   ObtenerPacientePorId(idPaciente) {
    return this.http.get<VMPaciente>(this._baseUrlPaciente + '/api/Paciente/CargarDatosPaciente/' + idPaciente, { responseType: "json" })
  }

}
