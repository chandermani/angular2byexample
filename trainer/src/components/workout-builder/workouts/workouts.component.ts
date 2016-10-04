import {Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';

import { WorkoutPlan } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Component({
    selector: 'workouts',
    templateUrl: '/src/components/workout-builder/workouts/workouts.component.html'
})
export class WorkoutsComponent implements OnInit, OnDestroy {
    public workoutList:Array<WorkoutPlan> = [];
    public notFound:boolean = false;
    private subscription:any;

    constructor(
        public route:ActivatedRoute,
        public router:Router,
        public workoutService:WorkoutService) {
    }

    ngOnInit() {
        if(this.route.snapshot.url[1] && this.route.snapshot.url[1].path === 'workout-not-found') this.notFound = true;
        this.subscription = this.workoutService.getWorkouts()
            .subscribe(
                (workoutList: WorkoutPlan[]) => this.workoutList = workoutList,
                (err: any) => console.error(err)
            );
    }

    onSelect(workout:WorkoutPlan) {
        this.router.navigate(['./builder/workout', workout.name]);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}