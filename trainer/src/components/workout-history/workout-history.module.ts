import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

import { WorkoutHistoryComponent }  from './workout-history.component';

@NgModule({
    imports: [BrowserModule, SharedModule],
    declarations: [WorkoutHistoryComponent],
    exports: [WorkoutHistoryComponent],
})
export class WorkoutHistoryModule { }