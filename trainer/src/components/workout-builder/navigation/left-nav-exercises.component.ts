import { Component, OnInit } from '@angular/core';
mport { Observable } from 'rxjs/Rx';

import { Exercise, ExercisePlan} from "../../../services/model";
import { WorkoutBuilderService } from "../../../services/workout-builder-service";
import { WorkoutService } from "../../../services/workout-service";

@Component({
    selector: 'left-nav-exercises',
    templateUrl: '/src/components/workout-builder/navigation/left-nav-exercises.component.html'
})
export class LeftNavExercisesComponent implements OnInit{
    exerciseList:Observable<Exercise[]>;
    errorMessage: any;

    constructor(
        public workoutService:WorkoutService,
        public workoutBuilderService:WorkoutBuilderService) {}

    ngOnInit() {
        this.exerciseList = this.workoutService.getExercises();
    }

    addExercise(exercise:Exercise) {
        this.workoutBuilderService.addExercise(new ExercisePlan(exercise, 30));
    }
}