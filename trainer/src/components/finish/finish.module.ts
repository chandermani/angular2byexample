import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FinishComponent }  from './finish.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule],
    declarations: [FinishComponent],
    exports: [FinishComponent],
})
export class FinishModule { }