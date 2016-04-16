import {Injectable} from 'angular2/core';
import {WorkoutPlan, Exercise} from './model';
import {WorkoutService} from "./workout-service";
import {ExercisePlan} from "./model";

@Injectable()
export class WorkoutBuilderService {
    buildingWorkout: WorkoutPlan;
    newWorkout: boolean;
    firstExercise: boolean = true;

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
        this.buildingWorkout.exercises.splice(currentIndex, 1)
    }

    addExercise(exercisePlan: ExercisePlan){
        if(this.newWorkout && this.firstExercise){
            this.buildingWorkout.exercises.splice(0, 1);
            this.firstExercise = false;
        }
        this.buildingWorkout.exercises.push(exercisePlan);
    }

    moveExerciseTo(exercise: ExercisePlan, toIndex: number ){
        if (toIndex < 0 || toIndex >= this.buildingWorkout.exercises.length) return;
        var currentIndex = this.buildingWorkout.exercises.indexOf(exercise);
        this.buildingWorkout.exercises.splice(toIndex, 0, this.buildingWorkout.exercises.splice(currentIndex, 1)[0]);
    }
}
