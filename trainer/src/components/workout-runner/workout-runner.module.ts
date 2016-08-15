import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WorkoutRunnerComponent }  from './workout-runner.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [WorkoutRunnerComponent],
    exports: [WorkoutRunnerComponent],
})
export class WorkoutRunnerModule { }