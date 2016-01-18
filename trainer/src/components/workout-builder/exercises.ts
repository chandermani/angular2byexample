import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {OnInit} from 'angular2/core';
import {LeftNavMain} from "./left-nav-main";
import {ExercisePlan, Exercise} from "../../services/model";
import {WorkoutService} from "../../services/workout-service";

@Component({
    selector: 'exercises',
    templateUrl: '/src/components/workout-builder/exercises.tpl.html',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, LeftNavMain]
})
export class Exercises {
    public exerciseList:Array<Exercise> = [];

    constructor(private _router:Router,
                private _workoutService:WorkoutService) {
    }

    ngOnInit() {
        this.exerciseList = this._workoutService.getExercises();
    }

    onSelect(exercise:Exercise) {
        this._router.navigate(['Exercise', {id: exercise.name}]);
    }
}

