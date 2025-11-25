import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
   providers: [
    provideRouter(routes), provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({

        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
        newestOnTop: true,
        maxOpened: 5,
        preventDuplicates: true,
        positionClass: 'toast-top-right',  // bottom placement looks great
      })
    )
  ]
  //providers: [provideRouter(routes), provideHttpClient()],
};
