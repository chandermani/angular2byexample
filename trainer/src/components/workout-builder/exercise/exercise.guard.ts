import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs/Rx";

import { Exercise } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Injectable()
export class ExerciseGuard implements CanActivate {
    exercise: Exercise;
    sub: any;

    constructor(
        public workoutService: WorkoutService,
        public router: Router) {}

    canActivate(route:ActivatedRouteSnapshot,
                state:RouterStateSnapshot):Observable<boolean> {
        let exerciseName = route.params['id'];
        return this.workoutService.getExercise(exerciseName)
            .take(1)
            .map(exercise => !!exercise)
            .do(exerciseExists => {
                if (!exerciseExists)  this.router.navigate(['/builder/exercises']);
            })
            .catch(error => {
                    if (error.status === 404) {
                        this.router.navigate(['/builder/exercises']);
                        return Observable.of(false)
                    } else {
                        return Observable.throw(error);
                    }
                }
            )
    }
}
