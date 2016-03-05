import {Injectable} from 'angular2/core';
import {WorkoutPlan, Exercise} from './model';
import {WorkoutService} from "./workout-service";
import {ExercisePlan} from "./model";

@Injectable()
export class WorkoutBuilderService {
    buildingWorkout: WorkoutPlan;
    newWorkout: boolean;

    constructor(private _workoutService:WorkoutService){}

    startBuildingNew(name: string){
        let exerciseArray : ExercisePlan[] = [];
        this.buildingWorkout = new WorkoutPlan("", "", 30, exerciseArray);
        this.newWorkout = true;
        return this.buildingWorkout;
    }

    startBuildingExisting(name: string){
        this.newWorkout = false;
        return this._workoutService.getWorkout(name);
    }

    removeExercise(exercise: ExercisePlan){
        var currentIndex = this.buildingWorkout.exercises.map(function(e) { return e.exercise.name; }).indexOf(exercise.exercise.name);
        this.buildingWorkout.exercises.splice(currentIndex, 1)
    }

    addExercise(exercisePlan: ExercisePlan){
        this.buildingWorkout.exercises.push(exercisePlan);
    }

    moveExerciseTo(exercise: ExercisePlan, toIndex: number ){
        if (toIndex < 0 || toIndex >= this.buildingWorkout.exercises.length) return;
        var currentIndex = this.buildingWorkout.exercises.indexOf(exercise);
        this.buildingWorkout.exercises.splice(toIndex, 0, this.buildingWorkout.exercises.splice(currentIndex, 1)[0]);
    }

    save(){
        let workout = this.newWorkout ?
            this._workoutService.addWorkout(this.buildingWorkout) :
            this._workoutService.updateWorkout(this.buildingWorkout);
        this.newWorkout = false;
        return workout;
    }
}
