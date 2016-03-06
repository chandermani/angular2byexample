import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {OnInit} from 'angular2/core';
import {ExercisePlan, Exercise} from "../../services/model";
import {WorkoutService} from "../../services/workout-service";
import {WorkoutBuilderService} from "../../services/workout-builder-service";

@Component({
    selector: 'left-nav-exercises',
    templateUrl: '/src/components/workout-builder/left-nav-exercises.tpl.html',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})
export class LeftNavExercises {
    public exerciseList:Array<Exercise> = [];
    public errorMessage: any;

    constructor(private _router:Router,
                private _workoutService:WorkoutService,
                private _workoutBuilderService:WorkoutBuilderService) {
    }

    ngOnInit() {
        this._workoutService.getExercises()
            .then(
                exerciseList => this.exerciseList = exerciseList,
                error => this.errorMessage = <any>error
            );
    }

    addExercise(exercise: Exercise) {
        this._workoutBuilderService.addExercise(new ExercisePlan(exercise, 30));
    }
}