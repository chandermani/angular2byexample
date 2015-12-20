import {Component} from 'angular2/core';
import {WorkoutRunner} from '../workout-runner/workout-runner';
import {Start} from '../workout-runner/start';
import {Finish} from '../workout-runner/finish';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
@Component({
  selector: 'trainer-app',
  directives: [ROUTER_DIRECTIVES],
  template: `<router-outlet></router-outlet>`
})
@RouteConfig([
  { path: '/start', name: 'Start', component: Start, useAsDefault: true },
  { path: '/workout', name: 'Workout', component: WorkoutRunner },
  { path: '/finish', name: 'Finish', component: Finish }
])
export class TrainerApp {
}
