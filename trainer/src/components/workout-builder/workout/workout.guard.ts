import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { WorkoutPlan } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Injectable()
export class WorkoutGuard implements CanActivate {
    private workout: WorkoutPlan;

    constructor(
        private workoutService: WorkoutService,
        private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        this.workoutService.getWorkout(route.params['id'])
            .subscribe(
                workout=>{
                    this.workout = workout;
                }
            )
        if(this.workout){ return true; }
        this.router.navigate(['/builder/workouts']);
        return false;
    }
}
