import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { WorkoutPlan } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Component({
    selector: 'workouts',
    templateUrl: '/src/components/workout-builder/workouts/workouts.component.html'
})
export class WorkoutsComponent implements OnInit {
    workoutList:Array<WorkoutPlan> = [];

    constructor(
        public router:Router,
        public workoutService:WorkoutService) {}

    ngOnInit() {
        this.workoutList = this.workoutService.getWorkouts();
    }

    onSelect(workout: WorkoutPlan) {
        this.router.navigate( ['./builder/workout', workout.name] );
    }
}