import { Component, OnInit } from '@angular/core';

import { Exercise, ExercisePlan} from "../../../services/model";
import { WorkoutBuilderService } from "../builder-services/workout-builder-service";
import { WorkoutService } from "../../../services/workout-service";

@Component({
    selector: 'left-nav-exercises',
    templateUrl: '/src/components/workout-builder/navigation/left-nav-exercises.component.html'
})
export class LeftNavExercisesComponent implements OnInit{
    exerciseList:Array<Exercise> = [];
    errorMessage: any;

    constructor(
        public workoutService:WorkoutService,
        public workoutBuilderService:WorkoutBuilderService) {}

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