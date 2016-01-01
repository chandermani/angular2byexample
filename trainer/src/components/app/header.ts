import {Component} from 'angular2/core';
import {WorkoutHistoryTracker} from '../../services/workout-history-tracker';
@Component({
  selector: 'header',
  template: `<div class="navbar-header">
                <h1>7 Minute Workout</h1>
             </div>
             <ul class="nav navbar-nav navbar-right">
                <li><a (click)="showWorkoutHistory()" title="Workout History">History</a></li>
             </ul>`
})
export class Header {
  constructor(private tracker:WorkoutHistoryTracker){}
  showWorkoutHistory() {
    console.log(this.tracker.getHistory().length);
  }
}
