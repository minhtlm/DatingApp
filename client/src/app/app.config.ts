import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorInterceptor } from './_interceptors/error.interceptor';
import { jwtInterceptor } from './_interceptors/jwt.interceptor';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { loadingInterceptor } from './_interceptors/loading.interceptor';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideAnimations(),
    provideHttpClient(withFetch(),withInterceptors([errorInterceptor]), withInterceptors([jwtInterceptor]), withInterceptors([loadingInterceptor])),
    importProvidersFrom(BsDropdownModule.forRoot()), 
    importProvidersFrom(TimeagoModule.forRoot({ formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter},
      intl: { provide: TimeagoIntl, }})), 
    importProvidersFrom(ToastrModule.forRoot({positionClass: 'toast-bottom-right'})),]
};
