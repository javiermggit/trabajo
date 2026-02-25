import { Injectable } from '@angular/core';
import { ControlPlanificacionFamiliar } from 'src/app/Modelos/Modelos';

@Injectable({
  providedIn: 'root'
})
export class PymService {

  ///Agudeza
  visualDiagnosticoId:number;
  descripcionVisual:string;
  ojoDerecho:string;
  ojoDerechoOtro:string;
  ojoIzquierdo:string;
  ojoIzquierdoOtro:string;
  observacionesAlteraciones:string;
  
  oidoDiagnosticoId:number;
  otoscopia:boolean;
  otoscopiaOidoDerecho:string;
  otoscopiaOidoIzquierdo:string;
  observacionesAlteracionesOido:string;
  mostrarAgudezaVisual:boolean= false;


  constructor() { 
    this.limpiarCampos();
  }


  limpiarCampos(){
      this.visualDiagnosticoId = 0;
      this.descripcionVisual = null;
      this.ojoDerecho = "";
      this.ojoIzquierdo = "";
      this.observacionesAlteraciones = "";

      this.oidoDiagnosticoId = 0;
      this.otoscopia = false;
      this.otoscopiaOidoDerecho = "";
      this.otoscopiaOidoIzquierdo = "";
      this.observacionesAlteracionesOido = "";
  }
}
