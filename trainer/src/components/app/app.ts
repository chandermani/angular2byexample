import {Component} from 'angular2/core';
import {WorkoutContainer} from '../workout-runner/workout-container';
import {Start} from '../workout-runner/start';
import {Finish} from '../workout-runner/finish';
import {WorkoutBuilder} from '../workout-builder/workout-builder';
import {WorkoutHistory} from './workout-history';
import {Header} from './header';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

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
  { path: '/builder', name: 'Builder', component: WorkoutBuilder},
  { path: '/history', name: 'History', component: WorkoutHistory }
])
export class TrainerApp {
}
