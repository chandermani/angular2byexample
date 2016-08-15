import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TrainerAppComponent }  from './app.component';
import {WorkoutRunnerModule} from '../workout-runner/workout-runner.module';

@NgModule({
  imports: [BrowserModule, WorkoutRunnerModule],
  declarations: [TrainerAppComponent],
  bootstrap: [TrainerAppComponent]
})
export class AppModule { }