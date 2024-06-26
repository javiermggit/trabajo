import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

// Services

@NgModule({
  declarations: [],
  providers: [ ],
  imports: [
    CommonModule
  ],
  exports:[
    ButtonModule,
    RippleModule
  ]
})
export class PrimengModule { }
