import { provideRouter, RouterConfig } from '@angular/router';
import {WorkoutRunnerComponent} from '../workout-runner/workout-runner.component';
import {StartComponent} from '../start/start.component';
import {FinishComponent} from '../finish/finish.component';

export const routes: RouterConfig = [
    { path: 'start', component: StartComponent },
    { path: 'workout', component: WorkoutRunnerComponent },
    { path: 'finish', component: FinishComponent },
    { path: '', redirectTo:'/start', pathMatch:'prefix' }
];
export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];