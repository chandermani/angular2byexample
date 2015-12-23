import {Component} from 'angular2/core';
import {WorkoutRunner} from '../workout-runner/workout-runner';
@Component({
    selector: 'trainer-app',
    directives:[WorkoutRunner],
    template: `<div class="navbar navbar-default navbar-fixed-top top-navbar">
                <div class="container app-container">
                  <div class="navbar-header">
                    <h1>7 Minute Workout</h1>
                  </div>
                </div>
              </div>
              <div class="container body-content app-container">
                <workout-runner></workout-runner>
              </div>`
})
export class TrainerApp {
}
