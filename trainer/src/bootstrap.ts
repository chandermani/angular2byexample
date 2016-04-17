///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {TrainerApp} from './components/app/app';
import {ROUTER_PROVIDERS} from 'angular2/router';
bootstrap(TrainerApp, [ROUTER_PROVIDERS]);
