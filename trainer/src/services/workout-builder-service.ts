import {Injectable} from 'angular2/core';
import {WorkoutPlan, Exercise} from './model';
import {WorkoutService} from "./workout-service";
import {ExercisePlan} from "./model";

@Injectable()
export class WorkoutBuilderService {
    buildingWorkout: any;
    newWorkout: boolean;

    constructor(private _workoutService:WorkoutService){}

    startBuilding(name: string){
        if(name){
            this.buildingWorkout = this._workoutService.getWorkout(name)
            this.newWorkout = false;
        }else{
            this.buildingWorkout = new WorkoutPlan("", "", 30, []);
            this.newWorkout = true;
        }
        return this.buildingWorkout;
    }

    removeExercise(exercise: ExercisePlan){
        var currentIndex = this.buildingWorkout.exercises.map(function(e) { return e.exercise.name; }).indexOf(exercise.exercise.name);
        //this.buildingWorkout.exercises.splice(this.buildingWorkout.exericses.indexOf(exercise), 1)
        this.buildingWorkout.exercises.splice(currentIndex, 1)
    }

    addExercise(exercise: ExercisePlan){
        this.buildingWorkout.exercises.push({ exercise: exercise, duration: 30 });
    }

    moveExerciseTo(exercise: ExercisePlan, toIndex: number ){
        if (toIndex < 0 || toIndex >= this.buildingWorkout.exercises) return;
        var currentIndex = this.buildingWorkout.exercises.indexOf(exercise);
        this.buildingWorkout.exercises.splice(toIndex, 0, this.buildingWorkout.exercises.splice(currentIndex, 1)[0]);
    }
}

