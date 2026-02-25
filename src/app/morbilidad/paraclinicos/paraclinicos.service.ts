import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResultadoAnnar, ResultadoLaboratorioAnnar, VMFechaResultadoOrdenamiento, VMResultadoLab, VMResultadoOrdenamiento } from 'src/app/Modelos/LaboratorioAnnar';
import { VmResultado } from 'src/app/Modelos/Modelos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParaclinicosService {

  _baseUrlHC: string;
  public listadoResultados: Array<VmResultado>;

  public listadoResultadosPendientes: Array<VMFechaResultadoOrdenamiento>;
  public listadoResultadosLeidos: Array<ResultadoAnnar>;

  constructor(
    private http: HttpClient
    //@Inject('URLHc') baseUrlHc: string
  ) {
    this._baseUrlHC = environment.URLHc;
    this.listadoResultados = new Array<VmResultado>();
    this.listadoResultadosPendientes = new Array<VMFechaResultadoOrdenamiento>();
    this.listadoResultadosLeidos = new Array<ResultadoAnnar>();
  }

  obtenerResultadoPendientes(paciente) {
    this.listadoResultadosPendientes = new Array<VMFechaResultadoOrdenamiento>();
    return this.http.get<Array<VMFechaResultadoOrdenamiento>>(this._baseUrlHC + '/api/Historicos/ObtenerResultadosLaboratorioAnnar?pacienteId=' + paciente, { responseType: "json" }).subscribe((response) => {
      this.listadoResultadosPendientes = response;
    });
  }



}
