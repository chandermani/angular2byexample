/// <reference path="../typings/browser.d.ts" />
import { bootstrap } from '@angular/platform-browser-dynamic';

import { APP_ROUTER_PROVIDERS } from './components/app/app.routes';
import { LocalStorage } from './services/local-storage';
import { TrainerAppComponent } from './components/app/app.component';
import { WorkoutBuilderService } from "./services/workout-builder-service";
import { WorkoutHistoryTracker } from './services/workout-history-tracker';
import { WorkoutService } from './services/workout-service';

// Register providers for browser, this is mandatory for angular2-modal
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';

bootstrap(TrainerAppComponent, [APP_ROUTER_PROVIDERS, WorkoutHistoryTracker, WorkoutBuilderService, WorkoutService, LocalStorage, MODAL_BROWSER_PROVIDERS]);