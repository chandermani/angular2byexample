import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TrainerAppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ TrainerAppComponent ],
  bootstrap:    [ TrainerAppComponent ]
})
export class AppModule { }