import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WorkoutRunnerComponent }  from './workout-runner.component';
import {ExerciseDescriptionComponent} from './exercise-description/exercise-description.component';
import {VideoPlayerComponent} from './video-player/video-player.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [WorkoutRunnerComponent, ExerciseDescriptionComponent, VideoPlayerComponent],
    exports: [WorkoutRunnerComponent],
})
export class WorkoutRunnerModule { }