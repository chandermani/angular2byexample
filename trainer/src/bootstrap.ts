/// <reference path="../typings/index.d.ts" />
import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { APP_ROUTER_PROVIDERS } from './components/app/app.routes';
import { ExerciseBuilderService } from "./services/exercise-builder-service";
import { LocalStorage } from './services/local-storage';
import { TrainerAppComponent } from './components/app/app.component';
import { WorkoutBuilderService } from "./services/workout-builder-service";
import { WorkoutHistoryTracker } from './services/workout-history-tracker';
import { WorkoutService } from './services/workout-service';

// Register providers for browser, this is mandatory for angular2-modal
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';

bootstrap(TrainerAppComponent, [
    disableDeprecatedForms(),
    provideForms(),
    APP_ROUTER_PROVIDERS, ExerciseBuilderService, WorkoutHistoryTracker, WorkoutBuilderService, WorkoutService, LocalStorage, MODAL_BROWSER_PROVIDERS
]);