import {Component, Input} from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {OnInit} from 'angular2/core';
import {ExercisePlan, Exercise} from "../../services/model";
import {WorkoutService} from "../../services/workout-service";
import {WorkoutBuilderService} from "../../services/workout-builder-service";

@Component({
    selector: 'left-nav-exercises',
    templateUrl: '/src/components/workout-builder/left-nav-exercises.tpl.html',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})
export class LeftNavExercises {
    public exerciseList:Observable<Exercise[]>;
    public errorMessage: any;

    constructor(private _router:Router,
                private _workoutService:WorkoutService,
                private _workoutBuilderService:WorkoutBuilderService) {
    }

    ngOnInit() {
        this.exerciseList = this._workoutService.getExercises();
/*            .subscribe(
                exerciseList=> {
                    this.exerciseList = exerciseList.sort((n1,n2) => {
                        if (n1.title > n2.title) {
                            return 1;
                        }
                        if (n1.title < n2.title) {
                            return -1;
                        }
                        return 0;
                    });
                },
                (err: any) => console.error(err)
            );*/
    }

    addExercise(exercise: Exercise) {
        this._workoutBuilderService.addExercise(new ExercisePlan(exercise, 30));
    }
}