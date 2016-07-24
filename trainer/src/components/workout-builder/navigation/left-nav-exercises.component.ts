import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Exercise } from "../../../services/model";
import { OrderByPipe } from "../../shared/order-by.pipe";
import { WorkoutService } from "../../../services/workout-service";

@Component({
    selector: 'left-nav-exercises',
    templateUrl: '/src/components/workout-builder/navigation/left-nav-exercises.component.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [OrderByPipe]
})
export class LeftNavExercisesComponent implements OnInit{
    public exerciseList:Array<Exercise> = [];

    constructor(private workoutService:WorkoutService) {}

    ngOnInit() {
        this.exerciseList = this.workoutService.getExercises();
    }

    addExercise(exercise:Exercise) {
        // Implementation here
    }



}

