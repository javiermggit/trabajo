import { DialogService } from 'primeng/dynamicdialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMfComponent } from './app-mf.component';
import { RouterModule } from '@angular/router';
import { routesAppmf } from './app-mf.routes';
//import { PrimengModule } from '../../core/modules/primeng.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ReimpresionComponent } from './reimpresion/reimpresion.component';
import { VistahcComponent } from './vistahc/vistahc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'; // si usas paginator
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routesAppmf),
    //PrimengModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    AutoCompleteModule,
    SelectButtonModule,
    AvatarModule,
    TabViewModule,
    ButtonModule,

    // 🔥 Angular Material
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  ],
  declarations: [
    AppMfComponent,
    ReimpresionComponent,
    VistahcComponent
  ],
  providers: [
    DatePipe
  ]

})
export class AppMfModule { }
