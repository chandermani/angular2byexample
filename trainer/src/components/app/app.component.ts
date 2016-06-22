import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';

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
export class TrainerAppComponent {
  constructor() {
    
  }
}
