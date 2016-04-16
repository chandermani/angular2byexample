import {Component, Input, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {LeftNavMain} from './left-nav-main';
import {WorkoutPlan} from "../../services/model";
import {WorkoutService} from "../../services/workout-service";
import {SecondsToTime} from "../workout-runner/pipes";

@Component({
    selector: 'workouts',
    templateUrl: '/src/components/workout-builder/workouts.tpl.html',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, LeftNavMain],
    pipes: [SecondsToTime]
})
export class Workouts implements OnInit {
    public workoutList: Array<WorkoutPlan> = [];

    constructor(
        private _router: Router,
        private _workoutService: WorkoutService){ }

    ngOnInit() {
       this.workoutList = this._workoutService.getWorkouts();
    }

    onSelect(workout: WorkoutPlan) {
        this._router.navigate( ['Workout', { id: workout.name }] );
    }
}
