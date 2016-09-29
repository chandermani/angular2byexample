import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Exercise } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Component({
    selector: 'exercises',
    templateUrl: '/src/components/workout-builder/exercises/exercises.component.html',
})
export class ExercisesComponent implements OnInit{
    exerciseList:Array<Exercise> = [];
    errorMessage: any;

    constructor(
        public router:Router,
        public workoutService:WorkoutService) {}

    ngOnInit() {
        this.workoutService.getExercises()
            .then(
                exerciseList => this.exerciseList = exerciseList,
                error => this.errorMessage = <any>error
            );
    }

    onSelect(exercise:Exercise) {
        this.router.navigate(['./builder/exercise', exercise.name]);
    }
}