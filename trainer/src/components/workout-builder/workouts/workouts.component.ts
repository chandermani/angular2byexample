import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { LeftNavMainComponent } from "../navigation/left-nav-main.component";
import { OrderByPipe } from "../../shared/order-by.pipe";
import { SecondsToTimePipe } from "../../workout-runner/seconds-to-time.pipe";
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