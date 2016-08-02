/// <reference path="../typings/index.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {TrainerAppComponent} from './components/app/app.component';
import { APP_ROUTER_PROVIDERS } from './components/app/app.routes';
import {LocalStorage} from './services/local-storage';
import {WorkoutHistoryTracker} from './services/workout-history-tracker';

// Register providers for browser, this is mandatory for angular2-modal
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';

bootstrap(TrainerAppComponent, [APP_ROUTER_PROVIDERS, WorkoutHistoryTracker, LocalStorage, MODAL_BROWSER_PROVIDERS]);
