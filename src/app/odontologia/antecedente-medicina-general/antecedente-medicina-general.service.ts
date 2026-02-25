import { Injectable, Inject } from '@angular/core';
import { AntecedentePatologicos, AntecedenteGinecoObstetrico, VMAntecedente, AntecedenteFamiliar } from 'src/app/Modelos/Modelos';
import { HttpClient } from '@angular/common/http';
import { AntecedenteService } from 'src/app/antecedentes/antecedente.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AntecedenteMedicinaGeneralService {

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

  
}
