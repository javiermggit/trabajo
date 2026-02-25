import { Injectable } from '@angular/core';
import { Familiograma } from '../Modelos/Adolescencia';

@Injectable({
  providedIn: 'root'
})
export class FamiliogramaService {
  public familiograma: Familiograma;
  constructor() {
    this.familiograma = new Familiograma();
  }
}
