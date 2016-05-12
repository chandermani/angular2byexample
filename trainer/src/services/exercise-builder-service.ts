import {Injectable} from 'angular2/core';
import {WorkoutPlan, Exercise} from './model';
import {WorkoutService} from "./workout-service";
import {ExercisePlan} from "./model";

@Injectable()
export class ExerciseBuilderService {
    buildingExercise: Exercise;
    newExercise: boolean;

    constructor(private _workoutService:WorkoutService){}

    startBuildingNew(name: string){
        this.buildingExercise = new Exercise("", "", "", "");
        this.newExercise = true;
        return this.buildingExercise;
    }

    startBuildingExisting(name: string){
            this.newExercise = false;
            return this._workoutService.getExercise(name)
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
        if(!this.buildingExercise.videos)
        {
            this.buildingExercise.videos = [];
        }
        this.buildingExercise.videos.push("");
    }

    canDeleteExercise(){
        return !this.newExercise;
    }

    deleteVideo(index: number){
        if (index >= 0) this.buildingExercise.videos.splice(index, 1);
    }
}
