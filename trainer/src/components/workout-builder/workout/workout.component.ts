import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { Router, RouteSegment, RouteTree, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';

import { BusyIndicatorDirective } from "../shared/busy-indicator.directive";
import { LeftNavExercisesComponent } from "../navigation/left-nav-exercises.component";
import { RemoteValidatorDirective } from "../shared/remote-validator.directive";
import { SecondsToTimePipe } from "../../workout-runner/seconds-to-time.pipe";
import { WorkoutPlan, ExercisePlan } from "../../../services/model";
import { WorkoutBuilderService } from "../../../services/workout-builder-service";

import { WorkoutService }  from "../../../services/workout-service";

@Component({
    selector: 'workout',
    templateUrl: '/src/components/workout-builder/workout/workout.component.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES, LeftNavExercisesComponent, BusyIndicatorDirective, RemoteValidatorDirective],
    pipes: [SecondsToTimePipe]
})
/*ToDo: Removed because it is not contained in the current release candidate; update when equivalent added in later release

@CanActivate((to: ComponentInstruction, from: ComponentInstruction) => {
    return new Promise((resolve) => {
        let injector = Injector.resolveAndCreate([WorkoutService, HTTP_PROVIDERS]);
        let workoutService = injector.get(WorkoutService);
        let workoutName: string;
        let workoutPlan: WorkoutPlan;

        if(to.urlPath === "workout/new"){
            resolve(true)
        }else{
            workoutName = to.params["id"];
            workoutService.getWorkout(workoutName)
            .subscribe(
                (data: WorkoutPlan) => {
                    workoutPlan = data;
                    if(workoutPlan){
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                (err: any) => console.error(err)
            );
        }
    });
})*/
export class WorkoutComponent implements OnActivate {
    public workout: WorkoutPlan;
    public workoutName: string;
    public submitted: boolean = false;

    constructor(
        public router: Router,
        private workoutBuilderService: WorkoutBuilderService,
        private workoutService: WorkoutService
    ) { }

    addExercise(exercisePlan: ExercisePlan) {
        this.workoutBuilderService.addExercise(exercisePlan);
    }

    moveExerciseTo(exercisePlan: ExercisePlan, location: any) {
        this.workoutBuilderService.moveExerciseTo(exercisePlan, location);
    }

    removeExercise(exercisePlan: ExercisePlan) {
        this.workoutBuilderService.removeExercise(exercisePlan);
    }

    routerOnActivate(
        current: RouteSegment,
        prev?: RouteSegment,
        currTree?: RouteTree,
        prevTree?: RouteTree) {
        return new Promise((resolve) => {
            this.workoutName = current.urlSegments[1].segment;
            if (this.workoutName === 'new') {
                this.workoutName = "";
                this.workout = this.workoutBuilderService.startBuildingNew(this.workoutName);
            } else {
                this.workoutBuilderService.startBuildingExisting(this.workoutName)
                    .subscribe(
                    (data: WorkoutPlan) => {
                        this.workout = <WorkoutPlan>data;
                        this.workoutBuilderService.buildingWorkout = this.workout;
                        if (this.workout) {
                            resolve(true);
                        } else {
                            // ToDo: update/remove once canActivate is reintroduced
                            this.router.navigate(['/builder/workouts']);
                            resolve(false);
                        }
                    },
                    (err: any) => {
                        if (err.status === 404) {
                            this.router.navigate(['/builder/workout-not-found'])
                        } else {
                            console.error(err)
                        }
                    }
                    );
            }
        })
    }

    save(formWorkout: any) {
        this.submitted = true;
        if (!formWorkout.valid) return;
        this.workoutBuilderService.save();
        this.router.navigate(['/builder/workouts']);
    }

    validateWorkoutName = (name: string): Promise<boolean> => {
        if (this.workoutName === name) return Promise.resolve(true);
        return this.workoutService.getWorkouts()
            .toPromise()
            .then((workouts: Array<WorkoutPlan>) => {
                return !(workouts.findIndex(w => w.name.toLowerCase() == name.toLocaleLowerCase()));
            }, error => {
                return true;
            });
    }

    durations = [{ title: "15 seconds", value: 15 },
        { title: "30 seconds", value: 30 },
        { title: "45 seconds", value: 45 },
        { title: "1 minute", value: 60 },
        { title: "1 minute 15 seconds", value: 75 },
        { title: "1 minute 30 seconds", value: 90 },
        { title: "1 minute 45 seconds", value: 105 },
        { title: "2 minutes", value: 120 },
        { title: "2 minutes 15 seconds", value: 135 },
        { title: "2 minutes 30 seconds", value: 150 },
        { title: "2 minutes 45 seconds", value: 165 },
        { title: "3 minutes", value: 180 },
        { title: "3 minutes 15 seconds", value: 195 },
        { title: "3 minutes 30 seconds", value: 210 },
        { title: "3 minutes 45 seconds", value: 225 },
        { title: "4 minutes", value: 240 },
        { title: "4 minutes 15 seconds", value: 255 },
        { title: "4 minutes 30 seconds", value: 270 },
        { title: "4 minutes 45 seconds", value: 285 },
        { title: "5 minutes", value: 300 }];
}