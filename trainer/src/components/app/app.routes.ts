import { provideRouter, RouterConfig } from '@angular/router';
import { SystemJsComponentResolver, ComponentResolver } from '@angular/core';
import { RuntimeCompiler } from '@angular/compiler'

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
    { path: '', redirectTo:'/start', pathMatch:'prefix' }
];
export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    {
        provide: ComponentResolver,
        useFactory: (r: any) => new SystemJsComponentResolver(r),
        deps: [RuntimeCompiler]
    },
];