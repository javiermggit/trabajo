import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JovenComponent } from './joven/joven.component';
import { NgbTabsetModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MorbilidadModule } from '../morbilidad/morbilidad.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { Joven } from '../Modelos/Joven';

@NgModule({
  declarations: [],
  imports: [
    GoogleChartsModule, CommonModule, NgbTabsetModule, NgbAccordionModule, FormsModule, HttpModule, HttpClientModule
  ],
  exports: []
})
export class JovenModule { }
