import { Injectable } from '@angular/core';
import { Ecomapa } from '../Modelos/Adolescencia';

@Injectable({
  providedIn: 'root'
})
export class EcomapaService {
  ecomapa = new Ecomapa();
  constructor() {

  }
}
