import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {LeftNavExercises} from "./left-nav-exercises";

@Component({
    selector: 'workout',
    templateUrl: '/src/components/workout-builder/workout.tpl.html',
    directives: [ROUTER_DIRECTIVES, LeftNavExercises]
})
export class Workout{
}
