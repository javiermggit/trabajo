import { Injectable, Inject } from '@angular/core';
import { VMPaciente } from '../Modelos/Modelos';
import { HttpClient } from '@angular/common/http';
//import { RequestOptions, Headers } from '@angular/http';
import { AntecedentePatologicos, VMAntecedente, AntecedenteGinecoObstetrico, AntecedenteFamiliar } from '../Modelos/Modelos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AntecedenteService {

  antecedentePatologicos = new AntecedentePatologicos;
  antecedenteGinecoObstetrico: AntecedenteGinecoObstetrico;
  
  quirurgicos: VMAntecedente[];
  traumaticos: VMAntecedente[];
  transfusiones: VMAntecedente[];
  alergicos: VMAntecedente[];
  farmacologicos: VMAntecedente[];
  antecedenteFamiliar: AntecedenteFamiliar;

  public _baseUrl = "";
  constructor(
    private http: HttpClient
    //@Inject('URLHc') baseUrlHc: string
  ) {
    this.quirurgicos = new Array<VMAntecedente>();
    this.traumaticos = new Array<VMAntecedente>();
    this.transfusiones = new Array<VMAntecedente>();
    this.alergicos = new Array<VMAntecedente>();
    this.farmacologicos = new Array<VMAntecedente>();

    this.antecedenteGinecoObstetrico = new AntecedenteGinecoObstetrico();
    this.antecedenteFamiliar = new AntecedenteFamiliar();
    this.antecedentePatologicos = new AntecedentePatologicos();
    this._baseUrl = environment.URLHc;
    
  }

  ObtenerAntecedentesByCita(citaId) {
    
    return this.http.get<AntecedenteService>(this._baseUrl + '/api/Morbilidad/CargarAntecedentesByCita/' + citaId, { responseType: "json" }).subscribe((response) => {
      
      this.quirurgicos = response.quirurgicos;
      this.traumaticos = response.traumaticos;
      this.transfusiones = response.transfusiones;
      this.alergicos = response.alergicos;
      this.farmacologicos = response.farmacologicos;
      this.antecedenteGinecoObstetrico = response.antecedenteGinecoObstetrico;
      this.antecedenteFamiliar = response.antecedenteFamiliar;
      this.antecedentePatologicos = response.antecedentePatologicos;
    })
  }
}
