import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutContainerCompnent } from '../workout-runner/workout-container/workout-container.component';
import { StartComponent } from '../start/start.component';
import { FinishComponent } from '../finish/finish.component';
import { WorkoutHistoryComponent } from '../workout-history/workout-history.component';

const workoutBuilderRoutes: Routes = [
  {
    path: 'builder',
    loadChildren: 'dist/components/workout-builder/workout-builder.module#WorkoutBuilderModule'
  }
];

export const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'workout/:id', component: WorkoutContainerCompnent },
  { path: 'finish', component: FinishComponent },
  { path: 'history', component: WorkoutHistoryComponent },
    ...workoutBuilderRoutes,
  { path: '**', redirectTo: '/start' }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);