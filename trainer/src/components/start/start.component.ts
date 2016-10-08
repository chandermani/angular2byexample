import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { WorkoutPlan } from "../../services/model";
import {WorkoutService } from "../../services/workout-service";

@Component({
  selector: 'start',
  templateUrl: '/src/components/start/start.html',
})
export class StartComponent implements OnInit, OnDestroy{
    public workoutList:Array<WorkoutPlan> = [];
    public notFound:boolean = false;
    public searchTerm: string;
    private subscription:any;

    constructor(private router:Router,
                private workoutService:WorkoutService) {
    }

    ngOnInit() {
        this.subscription = this.workoutService.getWorkouts()
            .subscribe(
                workoutList => this.workoutList = workoutList,
                (err:any) => console.error(err)
            );
    }

    onSelect(workout:WorkoutPlan) {
        this.router.navigate(['/workout', workout.name]);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
