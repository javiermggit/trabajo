import { Component, Input, OnInit } from '@angular/core';
import { Diente } from 'src/app/Modelos/Odontologia';
import { IndicadoresService } from '../indicadores.service';

@Component({
  selector: 'app-diente-indicador-placa',
  templateUrl: './diente-indicador-placa.component.html',
  styleUrls: ['./diente-indicador-placa.component.scss']
})
export class DienteIndicadorPlacaComponent implements OnInit {
  @Input() value: number;
  eventosDiente: Diente;

  constructor(private indicadoresService: IndicadoresService) {}

  ngOnInit(): void {
    this.eventosDiente = this.indicadoresService.obtenerEventosDiente(this.value);
  }
}
