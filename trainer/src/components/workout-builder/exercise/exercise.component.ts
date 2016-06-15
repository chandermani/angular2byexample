import { Validators, FormBuilder, ControlGroup, Control, AbstractControl, FORM_DIRECTIVES } from '@angular/common';
import { Component, OnInit, Input, Injector } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { OnActivate, Router, RouteSegment, RouteTree,ROUTER_DIRECTIVES } from '@angular/router';

import { ExerciseBuilderService } from "../../../services/exercise-builder-service";
import { WorkoutService } from "../../../services/workout-service";
import { AlphaNumericValidator } from "../alphanumeric-validator";

@Component({
    selector: 'exercise',
    templateUrl: '/src/components/workout-builder/exercise/exercise.component.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

/*ToDo: Removed because it is not contained in the current release candidate; update when equivalent added in later release
/*@CanActivate((to: ComponentInstruction, from: ComponentInstruction) => {
    return new Promise((resolve) => {
        let injector = Injector.resolveAndCreate([ExerciseBuilderService, WorkoutService]);
        let exerciseBuilderService = injector.get(ExerciseBuilderService);
        let exerciseName: String;
        let exercise: Exercise;

        if(to.urlPath === "exercise/new"){
            exerciseName = "";
        }else{
            exerciseName = to.params["id"];
            workoutService.getExercise(exerciseName)
                .subscribe(
                    (data: Exercise) => {
                        exercise = data;
                        if(exercise){
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    (err: any) => console.error(err)
                );
        }
    });
})*/
export class ExerciseComponent implements OnActivate, OnInit{
public exercise: any;
public submitted: boolean = false;
public exerciseForm: ControlGroup;
public model: any;
public video: any;

    constructor(
        private router: Router,
        private exerciseBuilderService:ExerciseBuilderService,
        private formBuilder: FormBuilder
){}

    ngOnInit():any{
        this.buildExerciseForm();
    }

    buildExerciseForm(){
        this.exerciseForm = this.formBuilder.group({
            'name': [this.exercise.name, Validators.compose([Validators.required, AlphaNumericValidator.invalidAlphaNumeric])],
            'title': [this.exercise.title, Validators.required],
            'description': [this.exercise.description, Validators.required],
            'image': [this.exercise.image, Validators.required],
            'nameSound': [this.exercise.nameSound],
            'procedure': [this.exercise.procedure],
            'videos': new ControlGroup(this.toControlGroup())
        });
    }

    toControlGroup(){
        let group:any = {};
        let index: number = 0;
        if(this.exercise.videos){
            this.exercise.videos.forEach((video : any) => {
                let name: string = 'video' + index;
                group[name] = new Control(this.exercise.videos[index], Validators.required);
                index++;
            });
        }
        return group;
    }

    routerOnActivate(
        current: RouteSegment,
        prev?: RouteSegment,
        currTree?: RouteTree,
        prevTree?: RouteTree)
        {
        return new Promise((resolve) => {
            let exerciseName = current.urlSegments[1].segment;
            if(exerciseName === 'new') {
                exerciseName = "";
                this.exercise = this._exerciseBuilderService.startBuildingNew(exerciseName);
            } else {
                exerciseName = to.params["id"];
                this.exercise = this._exerciseBuilderService.startBuildingExisting(exerciseName)
                    .subscribe(
                        (data: Exercise) => {
                            this.exercise = data;
                            this._exerciseBuilderService.buildingExercise = this.exercise;
                            if(this.exercise){
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        (err: any) => console.error(err)
                    );
            }

            if (this.exercise) {
                resolve(true);
            } else {
                // ToDo: update/remove once canActivate is reintroduced
                this.router.navigate(['/builder/exercises']);
                resolve(false);
            }
        })
    }

    onSubmit(formExercise:any){
        this.submitted = true;
        if (!formExercise.valid ||!this.checkVideos(formExercise)) return;
        this.exerciseBuilderService.save();
        this.router.navigate(['Exercises']);
    }

    delete() {
        this.exerciseBuilderService.delete();
        this.router.navigate( ['/builder/exercises'] );
    }

    addVideo(){
        this.exerciseBuilderService.addVideo();
        let videoName = 'video' + (this.exercise.videos.length - 1);
        (<ControlGroup>this.exerciseForm.controls['videos']).controls[videoName] = new Control("", Validators.required);
    }

    canDeleteExercise(){
        this.exerciseBuilderService.canDeleteExercise();
    }

    deleteVideo(index: number){
        this.exerciseBuilderService.deleteVideo(index);
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
