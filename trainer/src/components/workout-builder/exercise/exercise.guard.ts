import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Exercise } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Injectable()
export class ExerciseGuard implements CanActivate {
    exercise: Exercise;
    sub: any;

    constructor(
        public workoutService: WorkoutService,
        public router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        this.workoutService.getExercise(route.params['id'])
            .subscribe(
                (exercise: Exercise) =>{
                    this.exercise = exercise;
                }
            )

        if(this.exercise){ return true; }
        this.router.navigate(['/builder/exercises']);
        return false;
    }
}
