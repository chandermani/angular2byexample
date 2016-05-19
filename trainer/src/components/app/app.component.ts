import {Component} from '@angular/core';
import {WorkoutRunnerComponent} from '../workout-runner/workout-runner.component';
import {StartComponent} from '../start/start.component';
import {FinishComponent} from '../finish/finish.component';
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
  { path: '/start', component: StartComponent },
  { path: '/workout', component: WorkoutRunnerComponent },
  { path: '/finish', component: FinishComponent },
  { path: '/', component: StartComponent }
])
export class TrainerAppComponent {
  constructor(private router:Router) {
    
  }
}
