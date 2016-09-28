import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/forkJoin';

import {Exercise, WorkoutPlan } from './model';

@Injectable()
export class WorkoutService {
    workouts: Array<WorkoutPlan> = [];
    exercises: Array<Exercise> = [];
    workout: WorkoutPlan;
    collectionsUrl = 'https://api.mongolab.com/api/1/databases/personaltrainer/collections';
    apiKey = '9xfTWt1ilKhqIqzV9Z_8jvCzo5ksjexx';
    params = '?apiKey=' + this.apiKey;

    constructor(public http: Http) {
    }

    getExercises(){
        return this.http.get(this.collectionsUrl + '/exercises' + this.params)
            .map((res: Response) => <Exercise[]>res.json())
            .catch(WorkoutService.handleError);
    }

    getExercise(exerciseName: string){
        return this.http.get(this.collectionsUrl + '/exercises/'+ exerciseName  + this.params)
            .map((res: Response) => <Exercise>res.json())
            .catch(WorkoutService.handleError);
    }

    updateExercise(exercise: Exercise){
        for (var i = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].name === exercise.name) {
                this.exercises[i] = exercise;
            }
        }
        return exercise;
    }

    addExercise(exercise: Exercise){
        if (exercise.name) {
            this.exercises.push(exercise);
            return exercise;
        }
    }

    deleteExercise(exerciseName: string){
        let exerciseIndex: number;
        for (var i = 0; i < this.exercises.length; i++) {
            if (this.exercises[i].name === exerciseName) {
                exerciseIndex = i;
            }
        }
        if (exerciseIndex >= 0) this.exercises.splice(exerciseIndex, 1);
    }

    getWorkouts() {
        return this.http.get(this.collectionsUrl + '/workouts' + this.params)
            .map((res:Response) => <WorkoutPlan[]>res.json())
            .map((workouts:Array<any>) => {
                let result:Array<WorkoutPlan> = [];
                if (workouts) {
                    workouts.forEach((workout) => {
                        result.push(
                            new WorkoutPlan(
                                workout.name,
                                workout.title,
                                workout.restBetweenExercise,
                                workout.exercises,
                                workout.description
                            ));
                    });
                }
                return result;
            })
            .catch(WorkoutService.handleError);
    }

    getWorkout(workoutName:string) {
        return Observable.forkJoin(
            this.http.get(this.collectionsUrl + '/exercises' + this.params).map((res:Response) => <Exercise[]>res.json()),
            this.http.get(this.collectionsUrl + '/workouts/' + workoutName + this.params).map((res:Response) => <WorkoutPlan>res.json())
        ).map(
            (data:any) => {
                let allExercises = data[0];
                let workout = new WorkoutPlan(
                    data[1].name,
                    data[1].title,
                    data[1].restBetweenExercise,
                    data[1].exercises,
                    data[1].description
                )
                workout.exercises.forEach(
                    (exercisePlan:any) => exercisePlan.exercise = allExercises.find(
                        (x:any) => x.name === exercisePlan.name
                    )
                )
                return workout;
            }
        )
        .catch(WorkoutService.handleError);
    }

    addWorkout(workout: WorkoutPlan){
        if (workout.name) {
            this.workouts.push(workout);
            return workout;
        }
    }

    updateWorkout(workout: WorkoutPlan){
        for (var i = 0; i < this.workouts.length; i++) {
            if (this.workouts[i].name === workout.name) {
                this.workouts[i] = workout;
                break;
            }
        }
    }

    static handleError(error: Response) {
        console.log(error);
        return Observable.throw(error || 'Server error');
    }
}
