import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrenatalComponent } from './prenatal/prenatal.component';
import { NgbTabsetModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MorbilidadModule } from '../morbilidad/morbilidad.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { IndexPrenatalComponent } from './indexprenatal/indexprenatal.component';
import { CrecimientoDesarrollo } from '../Modelos/CrecimientoDesarrollo';
import { TransformBooleanPipe } from '../pipes/transform-boolean.pipe';
import { AlturaUterinaComponent } from './altura-uterina/altura-uterina.component';

@NgModule({
  declarations: [IndexPrenatalComponent, PrenatalComponent, TransformBooleanPipe, AlturaUterinaComponent],
  imports: [
    GoogleChartsModule, CommonModule, NgbTabsetModule, NgbAccordionModule, FormsModule, HttpModule, HttpClientModule
  ],
  exports: [PrenatalComponent, TransformBooleanPipe]
})
export class PrenatalModule { }
