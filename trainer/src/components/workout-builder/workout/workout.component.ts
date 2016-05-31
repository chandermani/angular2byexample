import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {LeftNavExercisesComponent} from "../navigation/left-nav-exercises.component";

@Component({
    selector: 'workout',
    templateUrl: '/src/components/workout-builder/workout/workout.component.html',
    directives: [ROUTER_DIRECTIVES, LeftNavExercisesComponent]
})
export class WorkoutComponent{
}