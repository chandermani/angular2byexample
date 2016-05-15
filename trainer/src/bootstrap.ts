/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {TrainerApp} from './components/app/app';
import {ROUTER_PROVIDERS} from '@angular/router';
bootstrap(TrainerApp, [ROUTER_PROVIDERS]);
