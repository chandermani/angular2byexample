import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LocalStorage } from './local-storage';
import { WorkoutHistoryTracker } from './workout-history-tracker';
import { WorkoutBuilderService } from "./workout-builder-service";
import { WorkoutService } from './workout-service';


@NgModule({
    imports: [],
    declarations: [],
    providers: [
        LocalStorage,
        WorkoutHistoryTracker,
        WorkoutBuilderService,
        WorkoutService],
})
export class ServicesModule { }