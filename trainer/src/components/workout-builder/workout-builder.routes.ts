import { RouterConfig }          from '@angular/router';

import { WorkoutBuilderComponent}  from "./workout-builder.component";
import { ExerciseComponent} from './exercise/exercise.component';
import { ExercisesComponent} from './exercises/exercises.component';
import { WorkoutComponent} from './workout/workout.component';
import { WorkoutsComponent} from './workouts/workouts.component';

export const WorkoutBuilderRoutes: RouterConfig = [
    {
        path: 'builder',
        component: WorkoutBuilderComponent,
        children: [
             {path:'', pathMatch: 'full', redirectTo: 'workouts'},
             {path:'workouts', component: WorkoutsComponent },
             {path:'workout/new',  component: WorkoutComponent },
             {path:'workout/:id', component: WorkoutComponent },
             {path:'exercises', component: ExercisesComponent},
             {path:'exercise/new', component: ExerciseComponent },
             {path:'exercise/:id', component: ExerciseComponent }
        ]
    }
];

