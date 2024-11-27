import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from "./routes";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideStore } from "@ngrx/store"
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { storeAdminReducer } from "../state/admin/adminReducer";
import { isDevMode } from '@angular/core';
import { allReducers } from "../state/allReducers";
import { MessageService } from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
    ),
    provideStore(allReducers),
    provideRouterStore(),
    MessageService
  ]
};
