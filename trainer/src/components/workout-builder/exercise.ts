import {Component, OnInit, Input, Injector} from 'angular2/core';
import {CanActivate, OnActivate, RouteData, ROUTER_DIRECTIVES, ComponentInstruction, Router} from 'angular2/router';
import {Validators, FormBuilder, ControlGroup, Control, AbstractControl, FORM_DIRECTIVES} from 'angular2/common';
import {ExerciseBuilderService} from "../../services/exercise-builder-service";
import {WorkoutService} from "../../services/workout-service";

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

export class Exercise implements OnActivate, OnInit{
    public exercise: any;
    public submitted: boolean = false;
    public exerciseForm: ControlGroup;
    public model: any;
    public video: any;

    constructor(
        private _router: Router,
        private _exerciseBuilderService:ExerciseBuilderService,
        private _formBuilder: FormBuilder
    ){}

    ngOnInit():any{
        this.buildExerciseForm();
    }

    buildExerciseForm(){
        this.exerciseForm = this._formBuilder.group({
            'name': [this.exercise.name, Validators.required],
            'title': [this.exercise.title, Validators.required],
            'description': [this.exercise.description, Validators.required],
            'image': [this.exercise.image, Validators.required],
            'nameSound': [this.exercise.nameSound],
            'procedure': [this.exercise.procedure],
            'videos': new ControlGroup(this.toGroup())
        });
    }

    toGroup(){
        let group = {};
        let index: number = 0;
        if(this.exercise.videos){
            this.exercise.videos.forEach((video : any) => {
                let name = 'video' + index;
                group[name] = new Control(this.exercise.videos[index], Validators.required);
                index++;
            });
        }
        return group;
    }

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

    onSubmit(formExercise:any){
        this.submitted = true;
        if (!formExercise.valid ||!this.checkVideos(formExercise)) return;
        this._exerciseBuilderService.save();
        this._router.navigate(['Exercises']);
    }

    delete() {
        this._exerciseBuilderService.delete();
        this._router.navigate( ['Exercises'] );
    }

    addVideo(){
        this._exerciseBuilderService.addVideo();
        let videoName = 'video' + (this.exercise.videos.length - 1);
        this.exerciseForm.controls['videos'].controls[videoName] = new Control("", Validators.required);
    }

    canDeleteExercise(){
        this._exerciseBuilderService.canDeleteExercise();
    }

    deleteVideo(index: number){
        this._exerciseBuilderService.deleteVideo(index);
    }

    checkVideos(formExercise: any){
        let foundVideos = formExercise.find('videos');
        if(foundVideos  && this.exercise.videos) {
            let videoCount = this.exercise.videos.length;
            for (var index = 0; index < videoCount; index++) {
                let videoName = 'video' + index;
                let video = foundVideos.find(videoName);
                if (video.status != "VALID") {
                    return false;
                }
            }
        };
        return true;
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }
}
