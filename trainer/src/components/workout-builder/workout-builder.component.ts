import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

import { SubNavComponent} from './navigation/sub-nav.component';

@Component({
    template: `<div class="navbar navbar-default navbar-fixed-top second-top-nav">
                  <sub-nav></sub-nav>
               </div>
               <div class="container body-content app-container">
                  <router-outlet></router-outlet>
               </div>`,
    directives: [ROUTER_DIRECTIVES, SubNavComponent]
})

export class WorkoutBuilderComponent{
}