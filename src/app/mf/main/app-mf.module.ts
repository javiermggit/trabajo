import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routesAppmf } from './app-mf.routes';
import { AppMfComponent } from './app-mf.component';
import { ReimpresionComponent } from './reimpresion/reimpresion.component';
import { VistahcComponent } from './vistahc/vistahc.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routesAppmf),
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    AutoCompleteModule,
    SelectButtonModule,
    AvatarModule,
    TabViewModule,
    ButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule
    
  ],
  declarations: [
    AppMfComponent,
    ReimpresionComponent,
    VistahcComponent
  ],
  providers: [DatePipe]
})
export class AppMfModule { }
