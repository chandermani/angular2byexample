import {ExercisePlan} from './model';
import {LocalStorage} from './local-storage';
import {Injectable} from 'angular2/core';

@Injectable()
export class WorkoutHistoryTracker {
  private _maxHistoryItems: number = 20;   //We only track for last 20 exercise
  private _currentWorkoutLog: WorkoutLogEntry = null;
  private _workoutHistory: Array<WorkoutLogEntry> = [];
  private _tracking: boolean;
  private _storageKey: string = "workouts";

  constructor(private _storage: LocalStorage) {
    this._workoutHistory=_storage.getItem<Array<WorkoutLogEntry>>(this._storageKey) || [];
  }

  get tracking(): boolean {
    return this._tracking;
  }

  startTracking() {
    this._tracking = true;
    this._currentWorkoutLog = new WorkoutLogEntry(new Date().toISOString());
    if (this._workoutHistory.length >= this._maxHistoryItems) {
      this._workoutHistory.shift();
    }
    this._workoutHistory.push(this._currentWorkoutLog);
    this._storage.setItem(this._storageKey, this._workoutHistory);
  }

  exerciseComplete(exercise: ExercisePlan) {
    this._currentWorkoutLog.lastExercise = exercise.exercise.title;
    ++this._currentWorkoutLog.exercisesDone;
    this._storage.setItem(this._storageKey, this._workoutHistory);
  }

  endTracking(completed: boolean) {
    this._currentWorkoutLog.completed = completed;
    this._currentWorkoutLog.endedOn = new Date().toISOString();
    this._currentWorkoutLog = null;
    this._tracking = false;
    this._storage.setItem(this._storageKey, this._workoutHistory);
  };

  getHistory(): Array<WorkoutLogEntry> {
    return this._workoutHistory;
  }
}
export class WorkoutLogEntry {
  constructor(
    public startedOn: string,
    public completed: boolean = false,
    public exercisesDone: number = 0,
    public lastExercise?: string,
    public endedOn?: string) { }
}
