import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Exercise } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Injectable()
export class ExerciseGuard implements CanActivate {
    private exercise: Exercise;
    private sub: any;

    constructor(
        private workoutService: WorkoutService,
        private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        this.workoutService.getExercise(route.params['id'])
            .subscribe(
                exercise=>{
                    this.exercise = exercise;
                }
            )

        if(this.exercise){ return true; }
        this.router.navigate(['/builder/exercises']);
        return false;
    }
}
