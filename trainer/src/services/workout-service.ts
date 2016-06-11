import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

import {Exercise, ExercisePlan, WorkoutPlan } from './model';

@Injectable()
export class WorkoutService {
    public workouts: Array<WorkoutPlan> = [];
    public exercises: Array<Exercise> = [];
    public workout: WorkoutPlan;
    private _collectionsUrl = 'https://api.mongolab.com/api/1/databases/personaltrainer/collections';
    private _apiKey = '9xfTWt1ilKhqIqzV9Z_8jvCzo5ksjexx';
    private _params = '?apiKey=' + this._apiKey;

    constructor(private _http: Http) {
    }

    getExercises(){
        return this._http.get(this._collectionsUrl + '/exercises' + this._params)
            .map((res: Response) => <Exercise[]>res.json())
            .catch(this.handleError);
    }

    getExercise(exerciseName: string){
        return this._http.get(this._collectionsUrl + '/exercises/'+ exerciseName  + this._params)
            .map((res: Response) => <Exercise>res.json())
            .catch(this.handleError);
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
        return this._http.get(this._collectionsUrl + '/workouts' + this._params)
            .map((res:Response) => <WorkoutPlan[]>res.json())
            .catch(this.handleError);
    }

    getWorkout(workoutName: string){
        return this._http.get(this._collectionsUrl + '/workouts/'+ workoutName  + this._params)
            .map((res: Response) => <WorkoutPlan>res.json())
            .catch(this.handleError);
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

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
