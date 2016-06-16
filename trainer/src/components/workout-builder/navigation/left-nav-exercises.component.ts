import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { Exercise, ExercisePlan} from "../../../services/model";
import { OrderByPipe } from "../../shared/order-by.pipe";
import { WorkoutBuilderService } from "../../../services/workout-builder-service";
import { WorkoutService } from "../../../services/workout-service";

@Component({
    selector: 'left-nav-exercises',
    templateUrl: '/src/components/workout-builder/navigation/left-nav-exercises.component.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [OrderByPipe]
})
export class LeftNavExercisesComponent implements OnInit{
    public exerciseList:Array<Exercise> = [];
    public errorMessage: any;

    constructor(
        private workoutService:WorkoutService,
        private workoutBuilderService:WorkoutBuilderService) {}

    ngOnInit() {
        this.workoutService.getExercises()
            .then(
                exerciseList => this.exerciseList = exerciseList,
                error => this.errorMessage = <any>error
            );
    }

    addExercise(exercise:Exercise) {
        this.workoutBuilderService.addExercise(new ExercisePlan(exercise, 30));
    }
}