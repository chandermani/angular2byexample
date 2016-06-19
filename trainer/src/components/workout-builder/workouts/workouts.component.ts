import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteSegment, RouteTree, OnActivate} from '@angular/router';

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
export class WorkoutsComponent implements OnInit, OnActivate {
    public workoutList:Array<WorkoutPlan> = [];
    public notFound:boolean = false;
    private subscription:any;

    constructor(private router:Router,
                private workoutService:WorkoutService) {
    }

    routerOnActivate(current:RouteSegment,
                     prev?:RouteSegment,
                     currTree?:RouteTree,
                     prevTree?:RouteTree) {
        this.notFound = current.urlSegments[0].segment === 'workout-not-found';
    }

    ngOnInit() {
        this.subscription = this.workoutService.getWorkouts()
            .subscribe(
                workoutList => this.workoutList = workoutList,
                (err:any) => console.error(err)
            );
    }

    onSelect(workout:WorkoutPlan) {
        this.router.navigate(['./builder/workout', workout.name]);
    }
}