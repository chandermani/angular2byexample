import { provideRouter, RouterConfig } from '@angular/router';
import {WorkoutContainerCompnent} from '../workout-runner/workout-container/workout-container.component';
import {StartComponent} from '../start/start.component';
import {FinishComponent} from '../finish/finish.component';
import {WorkoutHistoryComponent} from '../workout-history/workout-history.component';
import {WorkoutBuilderRoutes} from "../workout-builder/workout-builder.routes";

export const routes: RouterConfig = [
    { path: 'start', component: StartComponent },
    { path: 'workout', component: WorkoutContainerCompnent },
    { path: 'finish', component: FinishComponent },
    { path: 'history', component: WorkoutHistoryComponent },
    ...WorkoutBuilderRoutes,
    { path: '', component: StartComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];