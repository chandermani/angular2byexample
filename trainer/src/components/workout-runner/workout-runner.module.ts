import { NgModule }      from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { BrowserModule } from '@angular/platform-browser';

import { WorkoutRunnerComponent }  from './workout-runner.component';
import { WorkoutContainerCompnent } from './workout-container/workout-container.component';

import {ExerciseDescriptionComponent} from './exercise-description/exercise-description.component';
import {VideoPlayerComponent} from './video-player/video-player.component';
import {VideoDialogComponent} from './video-player/video-dialog.component';
import {WorkoutAudioComponent} from './workout-audio/workout-audio.component';
import {MyAudioDirective} from './workout-audio/my-audio.directive';

@NgModule({
    imports: [BrowserModule,
        SharedModule],
    declarations: [
        WorkoutRunnerComponent, 
        ExerciseDescriptionComponent, 
        VideoPlayerComponent,
        VideoDialogComponent, 
        WorkoutContainerCompnent,
        WorkoutAudioComponent,
        MyAudioDirective],
    exports: [WorkoutContainerCompnent],
    entryComponents:[VideoDialogComponent]
})
export class WorkoutRunnerModule { }