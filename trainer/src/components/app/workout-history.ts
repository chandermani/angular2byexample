import {Component} from 'angular2/core';
import {WorkoutHistoryTracker, WorkoutLogEntry} from '../../services/workout-history-tracker';
import {Location} from 'angular2/router';

@Component({
  selector: 'workout-history',
  templateUrl: `/src/components/app/workout-history.tpl.html`
})
export class WorkoutHistory {
  history: Array<WorkoutLogEntry> = [];

  constructor(private _tracker: WorkoutHistoryTracker, private _location: Location) { }

  ngOnInit() {
    this.history = this._tracker.getHistory();
  }

  goBack() {
    this._location.back();
  }
}
