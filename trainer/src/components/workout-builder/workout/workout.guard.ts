import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs/Rx";

import { WorkoutPlan } from "../../../services/model";
import { WorkoutService } from "../../../services/workout-service";

@Injectable()
export class WorkoutGuard implements CanActivate {
    workout: WorkoutPlan;

    constructor(
        public workoutService:WorkoutService,
        public router:Router) {
    }

    canActivate(route:ActivatedRouteSnapshot,
                state:RouterStateSnapshot):Observable<boolean> {
        let workoutName = route.params['id'];
        return this.workoutService.getWorkout(workoutName)
            .take(1)
            .map(workout => !!workout)
            .do(workoutExists => {
                if (!workoutExists)  this.router.navigate(['/builder/workouts']);
            })
            .catch(error => {
                    if (error.status === 404) {
                        this.router.navigate(['/builder/workouts']);
                        return Observable.of(false)
                    } else {
                        return Observable.throw(error);
                    }
                }
            )
    }
}