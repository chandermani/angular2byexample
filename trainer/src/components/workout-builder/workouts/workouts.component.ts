import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'workouts',
    templateUrl: '/src/components/workout-builder/workouts/workouts.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class WorkoutsComponent{
}