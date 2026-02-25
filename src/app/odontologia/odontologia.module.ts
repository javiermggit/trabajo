import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OdontogramaVisualizacionComponent } from './odontograma-visualizacion/odontograma-visualizacion.component';
import { DientesVisualizacionComponent } from './odontograma-visualizacion/dientes-visualizacion/dientes-visualizacion.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { DienteIndicadorPlacaComponent } from './indicadores/diente-indicador-placa/diente-indicador-placa.component';
import { DienteHistorialComponent } from './indicadores/diente-historial/diente-historial.component';

@NgModule({
  declarations: [
    OdontogramaVisualizacionComponent,
    DientesVisualizacionComponent,
    IndicadoresComponent,
    DienteIndicadorPlacaComponent,
    DienteHistorialComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    OdontogramaVisualizacionComponent,
    DientesVisualizacionComponent,
    IndicadoresComponent,
    DienteIndicadorPlacaComponent,
    DienteHistorialComponent
  ]
})
export class OdontologiaModule {}
