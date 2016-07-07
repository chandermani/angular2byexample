import { RouterConfig } from '@angular/router';

export const WorkoutBuilderRoutes: RouterConfig = [
    {
        path: 'builder',
        component: 'workout-builder#WorkoutBuilderComponent',
        children: [
             { path:'', pathMatch: 'full', redirectTo: 'workouts'},
             { path:'workouts', component: 'workouts#WorkoutsComponent' },
             { path:'workout/new',  component: 'workout#WorkoutComponent' },
             { path:'workout/:id', component: 'workout#WorkoutComponent' },
             { path:'exercises', component: 'exercises#ExercisesComponent' },
             { path:'exercise/new', component: 'exercise#ExerciseComponent' },
             { path:'exercise/:id', component: 'exercise#ExerciseComponent' }
        ] 
    }
];

