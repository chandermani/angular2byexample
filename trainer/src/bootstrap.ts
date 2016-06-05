/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router'

import {LocalStorage} from './services/local-storage';
import {TrainerAppComponent} from './components/app/app.component';
import {WorkoutBuilderService} from "./services/workout-builder-service";
import {WorkoutService} from "./services/workout-service";
import {WorkoutHistoryTracker} from './services/workout-history-tracker';

// Register providers for browser, this is mandatory for angular2-modal
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';

bootstrap(TrainerAppComponent, [ROUTER_PROVIDERS, WorkoutHistoryTracker, WorkoutBuilderService, WorkoutService, LocalStorage, MODAL_BROWSER_PROVIDERS]);