import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { WorkoutPlan } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Injectable()
export class WorkoutGuard implements CanActivate {
    workout: WorkoutPlan;

    constructor(
        public workoutService: WorkoutService,
        public router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        this.workoutService.getWorkout(route.params['id'])
            .subscribe(
                (workout: WorkoutPlan) =>{
                    this.workout = workout;
                }
            )
        if(this.workout){ return true; }
        this.router.navigate(['/builder/workouts']);
        return false;
    }
}
