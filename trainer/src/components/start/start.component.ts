import {Component, OnInit, OnDestroy} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {OrderByPipe} from "../shared/order-by.pipe";
import {SecondsToTimePipe} from "../workout-runner/seconds-to-time.pipe";
import {WorkoutPlan} from "../../services/model";
import {WorkoutService} from "../../services/workout-service";
import {SearchPipe} from "../shared/search.pipe";

@Component({
    selector: 'start',
    templateUrl: '/src/components/start/start.html',
    directives: [ROUTER_DIRECTIVES],
    pipes: [SecondsToTimePipe, OrderByPipe, SearchPipe]
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
