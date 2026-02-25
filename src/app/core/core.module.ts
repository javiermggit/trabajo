import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';

//import { AppConfigService } from './Services/app-config.service';
//import { BrandingService } from './Services/branding.service';

//import { LEGACY_PROVIDERS } from './legacy.providers';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    //AppConfigService,
    //BrandingService,
    DatePipe,
    // ...LEGACY_PROVIDERS
  ]
})
export class CoreModule {

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule ya fue cargado. Debe importarse solo en AppModule.'
      );
    }
  }
}
