import { Component } from '@angular/core';

@Component({
    template: `<div class="navbar navbar-default navbar-fixed-top second-top-nav">
                  <sub-nav></sub-nav>
               </div>
               <div class="container body-content app-container">
                  <router-outlet></router-outlet>
               </div>`
    })
export class WorkoutBuilderComponent{
}