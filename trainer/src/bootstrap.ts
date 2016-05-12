/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser';
import {TrainerApp} from './components/app/app';
import 'rxjs/Rx';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {WorkoutHistoryTracker} from './services/workout-history-tracker';
import {LocalStorage} from './services/local-storage';
import {provide} from 'angular2/core';
import {Modal, ModalConfig} from 'angular2-modal';
import {WorkoutService} from "./services/workout-service";
import {WorkoutBuilderService} from "./services/workout-builder-service";
import {ExerciseBuilderService} from "./services/exercise-builder-service";

bootstrap(TrainerApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS, WorkoutHistoryTracker, LocalStorage, WorkoutBuilderService, WorkoutService, ExerciseBuilderService, provide(ModalConfig, { useValue: new ModalConfig('lg', true, 81) }), Modal]);
