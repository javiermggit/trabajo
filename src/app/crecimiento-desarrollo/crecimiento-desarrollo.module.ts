import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTabsetModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgbTabsetModule,
    NgbAccordionModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [

  ]
})
export class CrecimientoDesarrolloModule { }
