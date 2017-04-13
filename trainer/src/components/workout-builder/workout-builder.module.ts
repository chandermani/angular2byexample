import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutBuilderComponent } from './workout-builder.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        WorkoutBuilderComponent
    ],
    exports: [WorkoutBuilderComponent]
})
export class WorkoutBuilderModule { }