import { DialogService } from 'primeng/dynamicdialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMfComponent } from './app-mf.component';
import { RouterModule } from '@angular/router';
import { routesAppmf } from './app-mf.routes';
import { ToastService } from '../../core/services/toast.service';
import { PrimengModule } from '../../core/modules/primeng.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routesAppmf),
    PrimengModule
  ],
  declarations: [AppMfComponent],
  providers: [DialogService, ToastService]
})
export class AppMfModule { }
