import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GuessTheNumberComponent }   from './guess-the-number.component';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ GuessTheNumberComponent ],
    bootstrap:    [ GuessTheNumberComponent ]
})

export class AppModule { }
