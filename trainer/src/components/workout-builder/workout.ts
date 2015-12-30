import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'workout',
    templateUrl: '/src/components/workout-builder/workouts.tpl.html',
    directives: [ROUTER_DIRECTIVES]
})
export class Workout{
}
