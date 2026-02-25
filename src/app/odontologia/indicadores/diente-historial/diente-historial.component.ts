import { Component, Input, OnInit } from '@angular/core';
import { Diente } from 'src/app/Modelos/Odontologia';
import { IndicadoresService } from '../indicadores.service';

@Component({
  selector: 'app-diente-historial',
  templateUrl: './diente-historial.component.html',
  styleUrls: ['./diente-historial.component.scss']
})
export class DienteHistorialComponent implements OnInit {
  @Input() value: number;
  eventosDiente: Diente;

  constructor(private indicadoresService: IndicadoresService) {}

  ngOnInit(): void {
    this.eventosDiente = this.indicadoresService.obtenerEventosDiente(this.value);
  }
}
