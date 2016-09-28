import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WorkoutHistoryComponent }  from './workout-history.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule],
    declarations: [WorkoutHistoryComponent],
    exports: [WorkoutHistoryComponent],
})
export class WorkoutHistoryModule { }