import {Component} from 'angular2/core';
import {Modal, ModalConfig} from 'angular2-modal';
import {WorkoutHistory} from './workout-history'

@Component({
  selector: 'header',
  directives: [WorkoutHistory],
  template: `<div class="navbar-header">
                <h1>Personal Trainer</h1>
             </div>
             <ul class="nav navbar-nav navbar-right">
                <li><a (click)='showWorkoutHistory()' title="Workout History">History</a></li>
             </ul>`
})
export class Header {
  constructor(private _modal: Modal) { }
  showWorkoutHistory() {
    this._modal.open(<any>WorkoutHistory,
      [],
      new ModalConfig('lg', true, 27));
  }
}
