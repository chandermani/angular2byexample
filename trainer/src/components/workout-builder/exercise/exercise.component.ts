import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Validators, FormArray, FormGroup, FormControl, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import {ExerciseBuilderService} from "../../../services/exercise-builder-service";
import {AlphaNumericValidator} from "../alphanumeric-validator";
import {ExercisePlan, Exercise} from "../../../services/model";

@Component({
    selector: 'exercise',
    templateUrl: '/src/components/workout-builder/exercise/exercise.component.html',
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class ExerciseComponent{
    public exercise: Exercise;
    public submitted: boolean = false;
    public exerciseForm: FormGroup;
    public model: any;
    public video: any;
    private sub: any;
    private videoArray: FormArray = new FormArray([]);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private exerciseBuilderService:ExerciseBuilderService,
        private formBuilder: FormBuilder
    ){}

    ngOnInit():any{
        this.sub = this.route.params.subscribe(params => {
            let exerciseName = params['id'];
            if (exerciseName === 'new') {
                exerciseName = "";
            }
            this.exercise = this.exerciseBuilderService.startBuilding(exerciseName);
        });

        this.buildExerciseForm();
    }

    buildExerciseForm(){

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

    addVideoArray(){
        if(this.exercise.videos){
            this.exercise.videos.forEach((video : any) => {
                this.videoArray.push(new FormControl(video, Validators.required));
            });
        }
        return this.videoArray;
    }

    onSubmit(formExercise:any){
        this.submitted = true;
        if (!formExercise.valid) return;
        this.exerciseBuilderService.save();
        this.router.navigate(['/builder/exercises']);
    }

    delete() {
        this.exerciseBuilderService.delete();
        this.router.navigate( ['/builder/exercises'] );
    }

    addVideo(){
        this.exerciseBuilderService.addVideo();
        let videoArray = this.exerciseForm.controls['videos'] as FormArray;
        videoArray.push(new FormControl("", Validators.required));
    }

    canDeleteExercise(){
        this.exerciseBuilderService.canDeleteExercise();
    }

    deleteVideo(index: number){
        this.exerciseBuilderService.deleteVideo(index);
        let videoArray = this.exerciseForm.controls['videos'] as FormArray;
        videoArray.removeAt(index);
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
