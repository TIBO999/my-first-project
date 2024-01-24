import {ApplicationConfig, InjectionToken, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import {usersFeature} from "./state/users.reducer";
import {provideStore} from "@ngrx/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {UserEffects} from "./state/users.effect";
import { provideEffects } from '@ngrx/effects';

export const LOCAL_STORAGE_USERS_KEY = new InjectionToken<string>('LOCAL_STORAGE_USERS_KEY')

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({ [usersFeature.name]: usersFeature.reducer }),
    MatDialogModule,
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75,
    }),
    provideEffects(),
    provideEffects(
      UserEffects,
    ),
    {
      provide: LOCAL_STORAGE_USERS_KEY,
      useValue: 'users'
    }
]
};
