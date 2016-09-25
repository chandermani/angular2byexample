import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { ExerciseComponent } from "./exercise/exercise.component";
import { ExercisesComponent } from "./exercises/exercises.component";
import { LeftNavExercisesComponent } from "./navigation/left-nav-exercises.component";
import { LeftNavMainComponent } from "./navigation/left-nav-main.component";
import { SubNavComponent} from './navigation/sub-nav.component';
import { WorkoutBuilderComponent } from "./workout-builder.component";
import { WorkoutComponent } from "./workout/workout.component";
import { WorkoutsComponent } from "./workouts/workouts.component";

import { workoutBuilderRouting } from './workout-builder.routes';

@NgModule({
    imports: [
        CommonModule,
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
        LeftNavMainComponent
    ],
    exports: [WorkoutBuilderComponent],
})
export class WorkoutBuilderModule { }