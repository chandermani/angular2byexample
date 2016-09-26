import {Component, OnInit} from '@angular/core';

import { Exercise } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Component({
    selector: 'left-nav-exercises',
    templateUrl: '/src/components/workout-builder/navigation/left-nav-exercises.component.html'
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