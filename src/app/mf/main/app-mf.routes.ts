import { Routes } from '@angular/router';
import { AppMfComponent } from './app-mf.component';
import { MainComponent } from 'src/app/main/main.component';

export const routesAppmf: Routes = [
    {
      path: "", component: AppMfComponent, children: [
        { path: '', component: MainComponent},
      ],
    }
  ];
