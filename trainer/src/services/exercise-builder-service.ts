import {Injectable} from 'angular2/core';
import {WorkoutPlan, Exercise} from './model';
import {WorkoutService} from "./workout-service";
import {ExercisePlan} from "./model";

@Injectable()
export class ExerciseBuilderService {
    buildingExercise: Exercise;
    newExercise: boolean;
    
    constructor(private _workoutService:WorkoutService){}

    startBuilding(name: string){
        if(name){
            this.buildingExercise = this._workoutService.getExercise(name)
            this.newExercise = false;
        }else{
            this.buildingExercise = new Exercise("", "", "", "");
            this.newExercise = true;
        }
        return this.buildingExercise;
    }

    save(){
        let workout = this.newExercise ?
            this._workoutService.addExercise(this.buildingExercise) :
            this._workoutService.updateExercise(this.buildingExercise);
        this.newExercise = false;
        return workout;
    }

    delete(){
        this._workoutService.deleteExercise(this.buildingExercise.name);
    }

    addVideo(){
        this.buildingExercise.videos.push("");
    }

    canDeleteExercise(){
        return !this.newExercise;
    }

    deleteVideo(index: number){
        if (index >= 0) this.buildingExercise.videos.splice(index, 1);
    }
}
