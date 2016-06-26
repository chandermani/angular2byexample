import {Component, Input} from '@angular/core';
import { Router, RouteSegment, RouteTree, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';

import {WorkoutAudioComponent} from '../workout-audio/workout-audio.component';
import {WorkoutRunnerComponent} from '../workout-runner.component';

@Component({
    selector: 'workout-container',
    templateUrl: '/src/components/workout-runner/workout-container/workout-container.html',
    directives: [WorkoutAudioComponent, WorkoutRunnerComponent]
})
export class WorkoutContainerCompnent implements OnActivate{
    public workoutName:string;

    constructor(private router:Router) {
    }

    routerOnActivate(current:RouteSegment,
                     prev?:RouteSegment,
                     currTree?:RouteTree,
                     prevTree?:RouteTree) {
        this.workoutName = current.urlSegments[1].segment;
    }
}
