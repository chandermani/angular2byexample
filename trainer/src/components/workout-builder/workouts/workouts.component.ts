import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { WorkoutPlan } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Component({
    selector: 'workouts',
    templateUrl: '/src/components/workout-builder/workouts/workouts.component.html'
})
export class WorkoutsComponent implements OnInit {
    public workoutList:Array<WorkoutPlan> = [];

    constructor(
        private router:Router,
        private workoutService:WorkoutService) {}

    ngOnInit() {
        this.workoutList = this.workoutService.getWorkouts();
    }

    onSelect(workout: WorkoutPlan) {
        this.router.navigate( ['./builder/workout', workout.name] );
    }
}