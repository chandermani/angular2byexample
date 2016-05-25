import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'workouts',
    templateUrl: '/src/components/workout-builder/workouts.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class Workouts{
}
