import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {OnInit} from 'angular2/core';
import {ExercisePlan, Exercise} from "../../services/model";
import {WorkoutService} from "../../services/workout-service";

@Component({
    selector: 'left-nav-exercises',
    templateUrl: '/src/components/workout-builder/left-nav-exercises.tpl.html',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})
export class LeftNavExercises {
    public exerciseList:Array<Exercise> = [];

    constructor(private _router:Router,
                private _workoutService:WorkoutService) {
    }

    ngOnInit() {
        this.exerciseList = this._workoutService.getExercises();
    }

    addExercise(exercise:Exercise) {
        // Implementation here
    }
}