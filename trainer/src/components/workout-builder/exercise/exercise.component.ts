import {Validators, FormBuilder, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import {Component, DoCheck} from '@angular/core';
import {OnActivate, Router, RouteSegment, RouteTree, ROUTER_DIRECTIVES} from '@angular/router';

import {ExerciseBuilderService} from "../../../services/exercise-builder-service";
import {AlphaNumericValidator} from "../alphanumeric-validator";
import {Exercise} from "../../../services/model";

@Component({
    selector: 'exercise',
    templateUrl: '/src/components/workout-builder/exercise/exercise.component.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

//ToDo: Removed because it is not contained in the current release candidate; update when equivalent added in later release
/*@CanActivate((to:ComponentInstruction, from:ComponentInstruction) => {
    return new Promise((resolve) => {
        let injector = Injector.resolveAndCreate([WorkoutService, HTTP_PROVIDERS]);
        let workoutService = injector.get(WorkoutService);
        let exerciseName:String;
        let exercise:Exercise;

        if (to.urlPath === "exercise/new") {
            resolve(true);
        } else {
            exerciseName = to.params["id"];
            workoutService.getExercise(exerciseName)
                .subscribe(
                    (data:Exercise) => {
                        exercise = data;
                        if (exercise) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    (err:any) => console.error(err)
                );
        }
    });
})*/

export class ExerciseComponent implements OnActivate, DoCheck {
    public exercise:any;
    private exerciseName:string;
    public submitted:boolean = false;
    public exerciseForm:ControlGroup;
    public model:any;
    public video:any;
    public dataLoaded:boolean = false;

    constructor(private router:Router,
                private exerciseBuilderService:ExerciseBuilderService,
                private formBuilder:FormBuilder) {
    }

    routerOnActivate(current:RouteSegment,
                     prev?:RouteSegment,
                     currTree?:RouteTree,
                     prevTree?:RouteTree) {
        this.exerciseName = current.urlSegments[1].segment;
        return new Promise((resolve) => {
            if (this.exerciseName === 'new') {
                this.exerciseName = "";
                this.exercise = this.exerciseBuilderService.startBuildingNew(this.exerciseName);
            } else {
                this.exerciseBuilderService.startBuildingExisting(this.exerciseName)
                    .subscribe(
                        (data:any) => {
                            this.exercise = data;
                            this.exerciseBuilderService.buildingExercise = this.exercise;
                            if (this.exercise) {
                                resolve(true);
                            } else {
                                // ToDo: update/remove once canActivate is reintroduced
                                this.router.navigate(['/builder/exercises']);
                                resolve(false);
                            }
                        },
                        (err:any) => {
                            if (err.status === 404) {
                                this.router.navigate(['/builder/exercises'])
                            } else {
                                console.error(err)
                            }
                        }
                    );

            }
        })
    }

    ngDoCheck():any {
        if (!this.dataLoaded) {
            this.buildExerciseForm();
        }
    }

    buildExerciseForm() {
        if (this.exercise) {
            this.dataLoaded = true;
            this.exerciseForm = this.formBuilder.group({
                'name': ["", Validators.compose([Validators.required, AlphaNumericValidator.invalidAlphaNumeric])],
                'title': ["", Validators.required],
                'description': ["", Validators.required],
                'image': ["", Validators.required],
                'nameSound': [""],
                'procedure': [""],
                'videos': new ControlGroup(this.toControlGroup())
            });
        }
    }

    toControlGroup() {
        let group:any = {};
        let index:number = 0;
        if (this.exercise && this.exercise.videos) {
            this.exercise.videos.forEach((video:any) => {
                let name:string = 'video' + index;
                group[name] = new Control(this.exercise.videos[index], Validators.required);
                index++;
            });
        }
        return group;
    }

    onSubmit(formExercise:any) {
        this.submitted = true;
        if (!formExercise.valid || !this.checkVideos(formExercise)) return;
        this.exerciseBuilderService.save();
        this.router.navigate(['/builder/exercises']);
    }

    delete() {
        this.exerciseBuilderService.delete();
        this.router.navigate(['/builder/exercises']);
    }

    addVideo() {
        this.exerciseBuilderService.addVideo();
        let videoName = 'video' + (this.exercise.videos.length - 1);
        (<ControlGroup>this.exerciseForm.controls['videos']).controls[videoName] = new Control("", Validators.required);
    }

    canDeleteExercise() {
        this.exerciseBuilderService.canDeleteExercise();
    }

    deleteVideo(index:number) {
        this.exerciseBuilderService.deleteVideo(index);
        let videoName = 'video' + index;
        (<ControlGroup>this.exerciseForm.controls['videos']).removeControl(videoName);
    }

    checkVideos(formExercise:any) {
        let foundVideos = formExercise.find('videos');
        if (foundVideos && this.exercise.videos) {
            let videoCount = this.exercise.videos.length;
            for (var index = 0; index < videoCount; index++) {
                let videoName = 'video' + index;
                let video = foundVideos.find(videoName);
                if (video.status != "VALID") {
                    return false;
                }
            }
        }
        ;
        return true;
    }

    customTrackBy(index:number, obj:any):any {
        return index;
    }
}
