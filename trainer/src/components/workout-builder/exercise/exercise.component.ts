import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { ExerciseBuilderService } from "../builder-services/exercise-builder-service";
import { AlphaNumericValidator } from "../alphanumeric-validator";
import { Exercise} from "../../../services/model";

@Component({
    selector: 'exercise',
    templateUrl: '/src/components/workout-builder/exercise/exercise.component.html',
})

export class ExerciseComponent{
    exercise: Exercise;
    submitted: boolean = false;
    exerciseForm: FormGroup;
    model: any;
    video: any;
    sub: any;
    videoArray: FormArray = new FormArray([]);

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public exerciseBuilderService:ExerciseBuilderService,
        public formBuilder: FormBuilder
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

    addVideoArray():FormArray{
        if(this.exercise.videos){
            this.exercise.videos.forEach((video : any) => {
                this.videoArray.push(new FormControl(video, Validators.required));
            });
        }
        return this.videoArray;
    }

    onSubmit(formExercise:FormGroup){
        this.submitted = true;
        if (!formExercise.valid) return;
        this.mapFormValues(formExercise);
        this.exerciseBuilderService.save();
        this.router.navigate(['/builder/exercises']);
    }

    delete() {
        this.exerciseBuilderService.delete();
        this.router.navigate( ['/builder/exercises'] );
    }

    addVideo(){
        this.exerciseBuilderService.addVideo();
        let vidArray = <FormArray>this.exerciseForm.controls['videos'];
        vidArray.push(new FormControl("", Validators.required));
    }

    canDeleteExercise(){
        this.exerciseBuilderService.canDeleteExercise();
    }

    deleteVideo(index: number){
        this.exerciseBuilderService.deleteVideo(index);
        let vidArray = <FormArray>this.exerciseForm.controls['videos'];
        vidArray.removeAt(index);
    }

    mapFormValues(form: FormGroup){
        this.exercise.name = form.controls['name'].value;
        this.exercise.title = form.controls['title'].value;
        this.exercise.description = form.controls['description'].value;
        this.exercise.image = form.controls['image'].value;
        this.exercise.nameSound = form.controls['nameSound'].value;
        this.exercise.procedure = form.controls['procedure'].value;
        this.exercise.videos = form.controls['videos'].value;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}