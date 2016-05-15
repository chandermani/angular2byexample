import {Component} from '@angular/core';
import {WorkoutRunner} from '../workout-runner/workout-runner';
import {Start} from '../workout-runner/start';
import {Finish} from '../workout-runner/finish';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
@Component({
  selector: 'trainer-app',
  directives:[ROUTER_DIRECTIVES],
  template: `<div class="navbar navbar-default navbar-fixed-top top-navbar">
              <div class="container app-container">
                <div class="navbar-header">
                  <h1>7 Minute Workout</h1>
                </div>
              </div>
            </div>
            <div class="container body-content app-container">
              <router-outlet></router-outlet>
            </div>`
})
@Routes([
  { path: '/start', component: Start },
  { path: '/workout', component: WorkoutRunner },
  { path: '/finish', component: Finish },
  { path: '/', component: Start }
])
export class TrainerApp {
  constructor(private _router:Router) {
    
  }
}
