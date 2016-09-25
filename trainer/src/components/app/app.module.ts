import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TrainerAppComponent }  from './app.component';
import {WorkoutRunnerComponent} from '../workout-runner/workout-runner.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [TrainerAppComponent, WorkoutRunnerComponent],
  bootstrap: [TrainerAppComponent]
})
export class AppModule { }