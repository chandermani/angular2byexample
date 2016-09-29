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
    subscription: any;

    constructor(
        public router:Router,
        public workoutService:WorkoutService) {}

    ngOnInit() {
        this.subscription = this.workoutService.getWorkouts()
            .subscribe(
                (workoutList: WorkoutPlan[]) => this.workoutList = workoutList,
                (err: any) => console.error(err)
            );
    }

    onSelect(workout: WorkoutPlan) {
        this.router.navigate( ['./builder/workout', workout.name] );
    }
}