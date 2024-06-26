import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './core/modules/primeng.module';
import { AppMfModule } from './mf/main/app-mf.module';
import { MainComponent } from './main/main.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
  ],
  exports: [AppMfModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
