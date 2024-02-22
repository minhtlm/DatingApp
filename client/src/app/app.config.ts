import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(HttpClientModule), importProvidersFrom(BsDropdownModule.forRoot())]
};
