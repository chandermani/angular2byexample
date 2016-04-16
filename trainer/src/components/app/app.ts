import {Component} from 'angular2/core';
import {WorkoutContainer} from '../workout-runner/workout-container';
import {Start} from '../workout-runner/start';
import {Finish} from '../workout-runner/finish';
import {WorkoutHistory} from './workout-history';
import {Header} from './header';
import {RouteConfig, ROUTER_DIRECTIVES, AsyncRoute} from 'angular2/router';
declare var System:any;
@Component({
  selector: 'trainer-app',
  directives: [ROUTER_DIRECTIVES, Header],
  template: `<div class="navbar navbar-default navbar-fixed-top top-navbar">
                <div class="container app-container">
                  <header></header>
                </div>
             </div>
             <div class="container body-content app-container">
                <router-outlet></router-outlet>
             </div>`
})
@RouteConfig([
  { path: '/start', name: 'Start', component: Start, useAsDefault: true },
  { path: '/workout', name: 'Workout', component: WorkoutContainer },
  { path: '/finish', name: 'Finish', component: Finish },
  new AsyncRoute({
    path: '/builder/...',
    loader: () => System.import('./dist/components/workout-builder/workout-builder').then((m:any) => m.WorkoutBuilder),
    name: 'Builder'
  }),
  { path: '/history', name: 'History', component: WorkoutHistory }
])
export class TrainerApp {
}
