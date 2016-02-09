import {Component, Input, Injector} from 'angular2/core';
import {CanActivate, OnActivate, RouteData, ROUTER_DIRECTIVES, ComponentInstruction, Router} from 'angular2/router';
import {FORM_DIRECTIVES} from 'angular2/common';
import {ExerciseBuilderService} from "../../services/exercise-builder-service";
//import {Exercise} from "../../services/model";
import {WorkoutService} from "../../services/workout-service";
import {SecondsToTime} from "../workout-runner/pipes";

@Component({
    selector: 'exercise',
    templateUrl: '/src/components/workout-builder/exercise.tpl.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
@CanActivate((to: ComponentInstruction, from: ComponentInstruction) => {
    return new Promise((resolve) => {
        let injector = Injector.resolveAndCreate([ExerciseBuilderService, WorkoutService]);
        let exerciseBuilderService = injector.get(ExerciseBuilderService);
        let exerciseName: String;

        if(to.urlPath === "exercise/new"){
            exerciseName = "";
        }else{
            exerciseName = to.params["id"];
        }

        let exercise = exerciseBuilderService.startBuilding(exerciseName);
        if(exercise){
            resolve(true);
        } else {
            resolve(false);
        }
    });
})
export class Exercise implements OnActivate{
    public exercise: any;
    public submitted: boolean = false;

    constructor(
        private _router: Router,
        private _exerciseBuilderService:ExerciseBuilderService){}

    //I had to do this.form.addControl(control, new Control('', Validators.required)). Then both [ngControl]="dimension.control" and ngControl="{{dimension.control}} works

    routerOnActivate(to: ComponentInstruction, from: ComponentInstruction) {
        return new Promise((resolve) => {
            let exerciseName:string;
            if (to.urlPath === "workout/new") {
                exerciseName = "";
            } else {
                exerciseName = to.params["id"];
            }
            this.exercise = this._exerciseBuilderService.startBuilding(exerciseName);

            if (this.exercise) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    }

    save(formExercise:any){
        this.submitted = true;
        if (!formExercise.valid) return;
        this._exerciseBuilderService.save();
        this._router.navigate(['Exercises']);
    }

    delete() {
        this._exerciseBuilderService.delete();
        this._router.navigate( ['Exercises'] );
    }

    addVideo(){
        this._exerciseBuilderService.save();
    }

    canDeleteExercise(){
        this._exerciseBuilderService.canDeleteExercise();
    }

    deleteVideo(index: number){
        this._exerciseBuilderService.deleteVideo(index);
    }
}
