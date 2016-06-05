import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { Exercise } from "../../../services/model";
import { LeftNavMainComponent } from "../navigation/left-nav-main.component";
import { OrderByPipe } from "../../shared/order-by.pipe";
import { WorkoutService } from "../../../services/workout-service";

@Component({
    selector: 'exercises',
    templateUrl: '/src/components/workout-builder/exercises/exercises.component.html',
    directives: [ROUTER_DIRECTIVES, LeftNavMainComponent],
    pipes: [OrderByPipe]
})
export class ExercisesComponent implements OnInit{
    public exerciseList:Array<Exercise> = [];
    
    constructor(
        private router:Router,
        private workoutService:WorkoutService) {}

    ngOnInit() {
        this.exerciseList = this.workoutService.getExercises();
    }
    onSelect(exercise:Exercise) {
        this.router.navigate(['./builder/exercise', exercise.name]);
    }
}