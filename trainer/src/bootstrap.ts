/// <reference path="../typings/browser.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {TrainerAppComponent} from './components/app/app.component';
import { APP_ROUTER_PROVIDERS } from './components/app/app.routes';
bootstrap(TrainerAppComponent, [APP_ROUTER_PROVIDERS]);
