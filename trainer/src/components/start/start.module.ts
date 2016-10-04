import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { FormsModule }   from '@angular/forms';

import { StartComponent }  from './start.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        SharedModule],
    declarations: [StartComponent],
    exports: [StartComponent],
})
export class StartModule { }