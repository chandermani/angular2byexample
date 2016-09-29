import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ExerciseBuilderService } from "./exercise-builder-service";
import { LocalStorage } from './local-storage';
import { WorkoutHistoryTracker } from './workout-history-tracker';
import { WorkoutBuilderService } from "./workout-builder-service";
import { WorkoutService } from './workout-service';

@NgModule({
    imports: [],
    declarations: [],
    providers: [
        ExerciseBuilderService,
        LocalStorage,
        WorkoutHistoryTracker,
        WorkoutBuilderService,
        WorkoutService],
})
export class ServicesModule { }