import {Component} from '@angular/core';
import {WorkoutHistoryTracker, WorkoutLogEntry} from '../../services/workout-history-tracker';
import {Location} from '@angular/common';

@Component({
  selector: 'workout-history',
  templateUrl: `/src/components/workout-history/workout-history.html`
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
