/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {TrainerAppComponent} from './components/app/app.component';
import {ROUTER_PROVIDERS} from '@angular/router';
import {WorkoutHistoryTracker} from './services/workout-history-tracker';
import {LocalStorage} from './services/local-storage';

// Register providers for browser, this is mandatory for angular2-modal
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';

bootstrap(TrainerAppComponent, [ROUTER_PROVIDERS, WorkoutHistoryTracker, LocalStorage, MODAL_BROWSER_PROVIDERS]);
