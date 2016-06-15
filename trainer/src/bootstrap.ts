/// <reference path="../typings/browser.d.ts" />
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';
import 'rxjs/Rx';

import { ExerciseBuilderService } from "./services/exercise-builder-service";
import { LocalStorage } from './services/local-storage';
import { TrainerAppComponent } from './components/app/app.component';
import { WorkoutBuilderService} from "./services/workout-builder-service";
import { WorkoutHistoryTracker } from './services/workout-history-tracker';
import { WorkoutService } from "./services/workout-service";

// Register providers for browser, this is mandatory for angular2-modal
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';

bootstrap(TrainerAppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, ExerciseBuilderService, WorkoutHistoryTracker, WorkoutBuilderService, WorkoutService, LocalStorage, MODAL_BROWSER_PROVIDERS]);