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
        <h1>Hello, {{name}}!</h1>
        Say hello to: <input [value]="name" (input)="name = $event.target.value">
      </div>`
})
export class TrainerAppComponent {
    name: string = 'World';
}
