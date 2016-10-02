import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkoutRunnerComponent} from '../workout-runner/workout-runner.component';
import {StartComponent} from '../start/start.component';
import {FinishComponent} from '../finish/finish.component';
import {WorkoutHistoryComponent} from '../workout-history/workout-history.component';

export const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'workout', component: WorkoutRunnerComponent },
  { path: 'finish', component: FinishComponent },
  { path: 'history', component: WorkoutHistoryComponent },
  { path: '**', redirectTo: '/start' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);