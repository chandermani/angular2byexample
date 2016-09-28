import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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

    getWorkouts(){
        return this.http.get(this.collectionsUrl + '/workouts' + this.params)
            .map((res:Response) => <WorkoutPlan[]>res.json())
            .catch(WorkoutService.handleError);
    }

    getWorkout(workoutName: string){
        return this.http.get(this.collectionsUrl + '/workouts/'+ workoutName  + this.params)
            .map((res: Response) => <WorkoutPlan>res.json())
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

    static handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
