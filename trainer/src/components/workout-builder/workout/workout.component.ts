import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WorkoutPlan, ExercisePlan } from "../../../services/model";
import { WorkoutBuilderService } from "../builder-services/workout-builder-service";

@Component({
    selector: 'workout',
    templateUrl: '/src/components/workout-builder/workout/workout.component.html'
})

export class WorkoutComponent implements OnInit, OnDestroy{
    workout: WorkoutPlan;
    sub: any;
    submitted: boolean = false;
    removeTouched: boolean = false;
    isExistingWorkout: boolean = false;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public workoutBuilderService:WorkoutBuilderService){ }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (!params['id']) {
                this.workout = this.workoutBuilderService.startBuildingNew();
            } else {
                let workoutName = params['id'];
                this.isExistingWorkout = true;
                this.workoutBuilderService.startBuildingExisting(workoutName)
                    .subscribe(
                        (data:WorkoutPlan) => {
                            this.workout = <WorkoutPlan>data;
                            if (!this.workout) {
                                this.router.navigate(['/builder/workouts']);
                            } else {
                                this.workoutBuilderService.buildingWorkout = this.workout;
                            }
                        },
                        (err:any) => {
                            if (err.status === 404) {
                                this.router.navigate(['/builder/workouts'])
                            } else {
                                console.error(err)
                            }
                        }
                    );
            }
        });
    }

    addExercise(exercisePlan: ExercisePlan) {
        this.workoutBuilderService.addExercise(exercisePlan);
    }

    moveExerciseTo(exercisePlan: ExercisePlan, location: any) {
        this.workoutBuilderService.moveExerciseTo(exercisePlan, location);
    }

    removeExercise(exercisePlan: ExercisePlan) {
        this.removeTouched = true;
        this.workoutBuilderService.removeExercise(exercisePlan);
    }

    save(formWorkout:any) {
        this.submitted = true;
        if (!formWorkout.valid) return;
        this.workoutBuilderService.save().subscribe(
            success => this.router.navigate(['/builder/workouts']),
            err => console.error(err)
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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