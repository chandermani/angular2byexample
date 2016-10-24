import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciseGuard } from "./exercise/exercise.guard";
import { WorkoutGuard } from "./workout/workout.guard";

import { WorkoutBuilderComponent}  from "./workout-builder.component";
import { ExerciseComponent } from './exercise/exercise.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutsComponent } from './workouts/workouts.component';

export const workoutBuilderRoutes: Routes = [
    {
        path: '',
        component: WorkoutBuilderComponent,
        children: [
             {path:'', pathMatch: 'full', redirectTo: 'workouts'},
             {path:'workouts/workout-not-found', component: WorkoutsComponent },
             {path:'workouts', component: WorkoutsComponent },
             {path:'workout/new',  component: WorkoutComponent },
             {path:'workout/:id', component: WorkoutComponent, canActivate: [WorkoutGuard] },
             {path:'exercises', component: ExercisesComponent},
             {path:'exercise/new', component: ExerciseComponent },
             {path:'exercise/:id', component: ExerciseComponent, canActivate: [ExerciseGuard] }
        ]
    }
];

export const workoutBuilderRouting: ModuleWithProviders = RouterModule.forChild(workoutBuilderRoutes);