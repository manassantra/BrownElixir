import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideNoopAnimations(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()
    ),
  ],
}).catch(err => console.error(err));
