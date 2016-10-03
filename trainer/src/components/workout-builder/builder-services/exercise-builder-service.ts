import { Injectable } from '@angular/core';

import { Exercise, ExercisePlan, WorkoutPlan } from '../../../services/model';
import { WorkoutService } from "../../../services/workout-service";

@Injectable()
export class ExerciseBuilderService {
    buildingExercise: any;
    newExercise: boolean;
    
    constructor(public workoutService:WorkoutService){}

    startBuilding(name: string){
        if(name){
            this.buildingExercise = this.workoutService.getExercise(name)
            this.newExercise = false;
        }else{
            this.buildingExercise = new Exercise("", "", "", "");
            this.newExercise = true;
        }
        return this.buildingExercise;
    }

    save(){
        let exercise = this.newExercise ?
            this.workoutService.addExercise(this.buildingExercise) :
            this.workoutService.updateExercise(this.buildingExercise);
        this.newExercise = false;
        return exercise;
    }

    delete(){
        this.workoutService.deleteExercise(this.buildingExercise.name);
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
