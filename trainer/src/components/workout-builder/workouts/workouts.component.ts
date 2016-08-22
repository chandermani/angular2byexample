import {Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';

import {LeftNavMainComponent} from "../navigation/left-nav-main.component";
import {OrderByPipe} from "../../shared/order-by.pipe";
import {SecondsToTimePipe} from "../../workout-runner/seconds-to-time.pipe";
import {WorkoutPlan} from "../../../services/model";
import {WorkoutService} from "../../../services/workout-service";

@Component({
    selector: 'workouts',
    templateUrl: '/src/components/workout-builder/workouts/workouts.component.html',
    directives: [ROUTER_DIRECTIVES, LeftNavMainComponent],
    pipes: [SecondsToTimePipe, OrderByPipe]
})
export class WorkoutsComponent implements OnInit, OnDestroy {
    public workoutList:Array<WorkoutPlan> = [];
    public notFound:boolean = false;
    private subscription:any;

    constructor(
                private route:ActivatedRoute,
                private router:Router,
                private workoutService:WorkoutService) {
    }

    ngOnInit() {
        if(this.route.snapshot.url[1] && this.route.snapshot.url[1].path === 'workout-not-found') this.notFound = true;
        this.subscription = this.workoutService.getWorkouts()
            .subscribe(
                workoutList => this.workoutList = workoutList,
                (err:any) => console.error(err)
            );
    }

    onSelect(workout:WorkoutPlan) {
        this.router.navigate(['./builder/workout', workout.name]);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}