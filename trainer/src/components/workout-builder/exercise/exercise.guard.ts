import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Exercise } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Injectable()
export class ExerciseGuard implements CanActivate {
    exercise: Exercise;

    constructor(
        private workoutService: WorkoutService,
        private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        this.exercise = this.workoutService.getExercise(route.params['id']);
        if(this.exercise){ return true; }
        this.router.navigate(['/builder/exercises']);
        return false;
    }
}
