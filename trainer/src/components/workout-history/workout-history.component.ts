import {Component} from '@angular/core';
import {WorkoutHistoryTracker, WorkoutLogEntry} from '../../services/workout-history-tracker';
import {Location} from '@angular/common';
import {OrderByPipe} from '../shared/order-by.pipe';
import {SearchPipe} from '../shared/search.pipe';

@Component({
  selector: 'workout-history',
  templateUrl: `/src/components/workout-history/workout-history.html`,
  pipes: [OrderByPipe, SearchPipe]
})
export class WorkoutHistoryComponent {
  history: Array<WorkoutLogEntry> = [];
  completed: boolean;
  constructor(private tracker: WorkoutHistoryTracker, private location: Location) { }

  ngOnInit() {
    this.history = this.tracker.getHistory();
  }

  goBack() {
    this.location.back();
  }
}
