/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {TrainerAppComponent} from './components/app/app.component';
import {ROUTER_PROVIDERS} from '@angular/router';
bootstrap(TrainerAppComponent, [ROUTER_PROVIDERS]);
