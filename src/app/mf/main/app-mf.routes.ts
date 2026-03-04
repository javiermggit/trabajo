import { Routes } from '@angular/router';
import { AppMfComponent } from './app-mf.component';
import { ReimpresionComponent } from './reimpresion/reimpresion.component';
import { VistahcComponent } from './vistahc/vistahc.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';


 export const routesAppmf: Routes = [
  {
    path: '',
    component: AppMfComponent,
    children: [
      //{ path: '', redirectTo: 'reimpresion', pathMatch: 'full' },
      { path: '', component: ReimpresionComponent },
      { path: 'vistahc', component: VistahcComponent },
      { path: 'historia-clinica', component: HistoriaClinicaComponent }
    ]
  }
];
