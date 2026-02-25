import { Component } from '@angular/core';
import { VistahcService } from './vistahc.service';

@Component({
  selector: 'app-vistahc',
  templateUrl: './vistahc.component.html',
  styleUrls: ['./vistahc.component.css']
})
export class VistahcComponent {
  constructor(private vistahcService: VistahcService) {}

  // Edita estas funciones con tu lógica real
  onBuscarPaciente() {
    this.vistahcService.buscarPaciente();
  }

  onAbrirHistoria() {
    this.vistahcService.abrirHistoria();
  }
}
