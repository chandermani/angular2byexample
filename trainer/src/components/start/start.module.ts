import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { StartComponent }  from './start.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule],
    declarations: [StartComponent],
    exports: [StartComponent],
})
export class StartModule { }