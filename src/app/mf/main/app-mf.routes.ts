import { Routes } from '@angular/router';
import { AppMfComponent } from './app-mf.component';
import { MainComponent } from 'src/app/main/main.component';
import { ReimpresionComponent } from './reimpresion/reimpresion.component';
import { VistahcComponent } from './vistahc/vistahc.component';


 export const routesAppmf: Routes = [
  {
    path: '',
    component: AppMfComponent,
    children: [
      //{ path: '', redirectTo: 'reimpresion', pathMatch: 'full' },
      { path: '', component: ReimpresionComponent },
      { path: 'vistahc', component: VistahcComponent }
    ]
  }
];
