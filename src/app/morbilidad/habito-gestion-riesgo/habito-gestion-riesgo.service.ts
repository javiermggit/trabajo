import { Injectable } from '@angular/core';
import { HabitosGestionRiesgo } from 'src/app/Modelos/Modelos';

@Injectable({
  providedIn: 'root'
})
export class HabitoGestionRiesgoService {

  HabitosGestionRiesgo: HabitosGestionRiesgo;
  swRemitidoEpoc: boolean = false;

  constructor() {

    this.HabitosGestionRiesgo = new HabitosGestionRiesgo();

    this.HabitosGestionRiesgo.consumoAlimentosRicosFibra = true;
    this.HabitosGestionRiesgo.bajoConsumoSal = true;
    this.HabitosGestionRiesgo.pesoAdecuadoTalla = true;
    this.HabitosGestionRiesgo.tomaAgua = true;
    this.HabitosGestionRiesgo.ejercicioPermanente = true;
    this.HabitosGestionRiesgo.buenosHabitosAalimenticios = true;
    this.HabitosGestionRiesgo.bajoConsumoGrasas = true;
    this.HabitosGestionRiesgo.horasSuenoAdecuadas = true;

  }



}
