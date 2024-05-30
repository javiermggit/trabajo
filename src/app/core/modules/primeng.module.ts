import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ToastModule } from 'primeng/toast';

// Services
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  providers: [ MessageService ],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports:[
    ToastModule
  ]
})
export class PrimengModule { }
