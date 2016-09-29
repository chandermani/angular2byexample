import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Exercise } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Component({
    selector: 'exercises',
    templateUrl: '/src/components/workout-builder/exercises/exercises.component.html',
})
export class ExercisesComponent implements OnInit{
    exerciseList:Observable<Exercise[]>;
    errorMessage: any;
    
    constructor(
        public router:Router,
        public workoutService:WorkoutService) {}

    ngOnInit() {
        this.exerciseList = this.workoutService.getExercises();
    }

    onSelect(exercise:Exercise) {
        this.router.navigate(['./builder/exercise', exercise.name]);
    }
}