import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WorkoutBuilderComponent } from "./workout-builder.component";

@NgModule({
    imports: [BrowserModule],
    declarations: [
        WorkoutBuilderComponent,
    ],
    exports: [WorkoutBuilderComponent],
})
export class WorkoutBuilderModule { }
