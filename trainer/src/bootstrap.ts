import {bootstrap} from 'angular2/platform/browser';
import {TrainerApp} from './components/app/app';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {WorkoutHistoryTracker} from './services/workout-history-tracker';
import {LocalStorage} from './services/local-storage';
bootstrap(TrainerApp, [ROUTER_PROVIDERS, WorkoutHistoryTracker, LocalStorage]);
