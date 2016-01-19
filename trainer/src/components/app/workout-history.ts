import {Component} from 'angular2/core';
import {WorkoutHistoryTracker, WorkoutLogEntry} from '../../services/workout-history-tracker';
import {Location} from 'angular2/router';
import {OrderByPipe, SearchPipe} from '../workout-runner/pipes';

@Component({
  selector: 'workout-history',
  templateUrl: `/src/components/app/workout-history.tpl.html`,
  pipes:[OrderByPipe, SearchPipe]
})
export class WorkoutHistory {
  history: Array<WorkoutLogEntry> = [];
  completed: boolean;
  constructor(private _tracker: WorkoutHistoryTracker, private _location: Location) { }

  ngOnInit() {
    this.history = this._tracker.getHistory();
  }

  goBack() {
    this._location.back();
  }
}
