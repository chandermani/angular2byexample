import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { ExerciseBuilderService } from "./builder-services/exercise-builder-service";
import { ExerciseComponent } from "./exercise/exercise.component";
import { ExercisesComponent } from "./exercises/exercises.component";
import { ExerciseGuard } from "./exercise/exercise.guard";
import { LeftNavExercisesComponent } from "./navigation/left-nav-exercises.component";
import { LeftNavMainComponent } from "./navigation/left-nav-main.component";
import { SubNavComponent} from './navigation/sub-nav.component';
import { WorkoutBuilderComponent } from "./workout-builder.component";
import { WorkoutComponent } from "./workout/workout.component";
import { WorkoutsComponent } from "./workouts/workouts.component";
import { WorkoutGuard } from './workout/workout.guard';
import { WorkoutBuilderService } from "./builder-services/workout-builder-service";

import { workoutBuilderRouting } from './workout-builder.routes';
import { BusyIndicatorDirective } from "./shared/busy-indicator.directive";
import { RemoteValidatorDirective } from "./shared/remote-validator.directive";
import {AjaxButtonComponent} from "./shared/ajax-button.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        workoutBuilderRouting
    ],
    declarations: [
        WorkoutBuilderComponent,
        WorkoutComponent,
        WorkoutsComponent,
        ExerciseComponent,
        ExercisesComponent,
        SubNavComponent,
        LeftNavExercisesComponent,
        LeftNavMainComponent,
        RemoteValidatorDirective,
        BusyIndicatorDirective,
        AjaxButtonComponent
    ],
    providers: [
        ExerciseBuilderService,
        ExerciseGuard,
        WorkoutBuilderService,
        WorkoutGuard
    ]
})
export class WorkoutBuilderModule { }