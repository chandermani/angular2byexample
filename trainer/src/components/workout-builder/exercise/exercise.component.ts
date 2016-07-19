import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';
import {
    Validators,
    FormArray,
    FormGroup,
    FormControl,
    FormBuilder,
    REACTIVE_FORM_DIRECTIVES
} from '@angular/forms';

import { ExerciseBuilderService } from "../../../services/exercise-builder-service";
import { AlphaNumericValidator } from "../alphanumeric-validator";
import { Exercise } from "../../../services/model";

@Component({
    selector: 'exercise',
    templateUrl: '/src/components/workout-builder/exercise/exercise.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class ExerciseComponent implements OnInit, OnDestroy, DoCheck {
    public exercise:Exercise;
    public submitted:boolean = false;
    public exerciseForm:FormGroup;
    public model:any;
    public video:any;
    private sub:any;
    private videoArray:FormArray = new FormArray([]);
    private dataLoaded:boolean = false;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private exerciseBuilderService:ExerciseBuilderService,
                private formBuilder:FormBuilder) {
    }

    ngOnInit():any {
        this.sub = this.route.params.subscribe(params => {
            if (!params['id']) {
                this.exercise = this.exerciseBuilderService.startBuildingNew();
            } else {
                let exerciseName = params['id'];
                this.exerciseBuilderService.startBuildingExisting(exerciseName)
                    .subscribe(
                        (data:Exercise) => {
                            this.exercise = <Exercise> data;
                            if (!this.exercise) {
                                this.router.navigate(['/builder/exercises']);
                            } else {
                                this.exerciseBuilderService.buildingExercise = this.exercise;
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
        });
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
                'name': [this.exercise.name, [Validators.required, AlphaNumericValidator.invalidAlphaNumeric]],
                'title': [this.exercise.title, Validators.required],
                'description': [this.exercise.description, Validators.required],
                'image': [this.exercise.image, Validators.required],
                'nameSound': [this.exercise.nameSound],
                'procedure': [this.exercise.procedure],
                'videos': this.addVideoArray()
            })
        }
    }

    addVideoArray() {
        if (this.exercise.videos) {
            this.exercise.videos.forEach((video:any) => {
                this.videoArray.push(new FormControl(video, Validators.required));
            });
        }
        return this.videoArray;
    }

    onSubmit(formExercise:any) {
        this.submitted = true;
        if (!formExercise.valid) return;
        this.exerciseBuilderService.save();
        this.router.navigate(['/builder/exercises']);
    }

    delete() {
        this.exerciseBuilderService.delete();
        this.router.navigate(['/builder/exercises']);
    }

    addVideo() {
        this.exerciseBuilderService.addVideo();
        let vidArray = <FormArray>this.exerciseForm.controls['videos'];
        vidArray.push(new FormControl("", Validators.required));
    }

    canDeleteExercise() {
        this.exerciseBuilderService.canDeleteExercise();
    }

    deleteVideo(index:number) {
        this.exerciseBuilderService.deleteVideo(index);
        let vidArray = <FormArray>this.exerciseForm.controls['videos'];
        vidArray.removeAt(index);
    }

    customTrackBy(index:number, obj:any):any {
        return index;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
