import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { LeftNavMainComponent } from "../navigation/left-nav-main.component";

@Component({
    selector: 'workouts',
    templateUrl: '/src/components/workout-builder/workouts/workouts.component.html',
    directives: [ROUTER_DIRECTIVES, LeftNavMainComponent]
})
export class WorkoutsComponent{
}