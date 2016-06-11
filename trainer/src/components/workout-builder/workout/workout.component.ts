import { Component, OnInit } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';
import { Router, RouteSegment, RouteTree, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';

import { LeftNavExercisesComponent } from "../navigation/left-nav-exercises.component";
import { SecondsToTimePipe } from "../../workout-runner/seconds-to-time.pipe";
import { WorkoutPlan, ExercisePlan } from "../../../services/model";
import { WorkoutBuilderService } from "../../../services/workout-builder-service";

@Component({
    selector: 'workout',
    templateUrl: '/src/components/workout-builder/workout/workout.component.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES, LeftNavExercisesComponent],
    pipes: [SecondsToTimePipe]
})
/*ToDo: Removed because it is not contained in the current release candidate; update when equivalent added in later release

@CanActivate((to: ComponentInstruction, from: ComponentInstruction) => {
    return new Promise((resolve) => {
        let injector = Injector.resolveAndCreate([WorkoutBuilderService, WorkoutService]);
        let workoutBuilderService = injector.get(WorkoutBuilderService);
        let workoutName: String;

        if(to.urlPath === "workout/new"){
            workoutName = "";
        }else{
            workoutName = to.params["id"];
        }

        let workout = workoutBuilderService.startBuilding(workoutName);
        if(workout){
            resolve(true);
        } else {
            resolve(false);
        }
    });
})*/
export class WorkoutComponent implements OnActivate  {
    public workout: WorkoutPlan;
    public submitted: boolean = false;

    constructor(
        public router: Router,
        private workoutBuilderService:WorkoutBuilderService){ }

    addExercise(exercisePlan: ExercisePlan){
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
        prevTree?: RouteTree)
    {
        return new Promise((resolve) => {
            let workoutName = current.urlSegments[1].segment;
            if (workoutName === 'new') {
                workoutName = "";
            }
            this.workout = this.workoutBuilderService.startBuilding(workoutName);
            if (this.workout) {
                resolve(true);
            } else {
                // ToDo: update/remove once canActivate is reintroduced
                this.router.navigate(['/builder/workouts']);
                resolve(false);
            }
        })
    }

    save(formWorkout:any){
        this.submitted = true;
        if (!formWorkout.valid) return;
        this.workoutBuilderService.save();
        this.router.navigate(['/builder/workouts']);
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