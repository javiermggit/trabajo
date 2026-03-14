import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routesAppmf } from './app-mf.routes';
import { AppMfComponent } from './app-mf.component';
import { ReimpresionComponent } from './reimpresion/reimpresion.component';
import { VistahcComponent } from './vistahc/vistahc.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
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
import { AccordionModule } from 'primeng/accordion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';

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
    HttpClientModule,
    AccordionModule,
    NgbModule,

    // ✅ Importaciones PrimeNG para VistahcComponent
    TableModule,
    PaginatorModule,
    DialogModule,
    InputTextModule,

    ToastModule,         // ← nuevo
    ConfirmDialogModule, // ← nuevo
    RadioButtonModule,   // ← nuevo
    TagModule,
    BadgeModule,

  ],
  declarations: [
    AppMfComponent,
    ReimpresionComponent,
    VistahcComponent,
    HistoriaClinicaComponent
  ],
  providers: [
    DatePipe,
    MessageService,      // ← nuevo
    ConfirmationService, // ← nuevo
    { provide: 'URLHc', useValue: environment.URLHc },
    { provide: 'URLParametrizacionGeneral', useValue: environment.URLParametrizacion },
    { provide: 'URLParametrizacion', useValue: environment.URLParametrizacion },
    { provide: 'UrlPrestador', useValue: environment.UrlPrestador },
    { provide: 'UrlOrdenamientoHealth', useValue: environment.UrlOrdenamiento },
    { provide: 'UrlMedicamento', useValue: '' }
  ]
})
export class AppMfModule { }
