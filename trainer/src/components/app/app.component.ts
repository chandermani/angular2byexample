import {Component} from '@angular/core';

@Component({
  selector: 'trainer-app',
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
export class TrainerAppComponent {
  constructor() {
    
  }
}
