import {ExercisePlan} from '../components/workout-runner/model';
export class WorkoutHistoryTracker {
  private _maxHistoryItems: number = 20;   //We only track for last 20 exercise
  private _currentWorkoutLog: WorkoutLogEntry = null;
  private _workoutHistory: Array<WorkoutLogEntry> = [];
  private _tracking: boolean;

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
  }

  exerciseComplete(exercise: ExercisePlan) {
    this._currentWorkoutLog.lastExercise = exercise.exercise.title;
    ++this._currentWorkoutLog.exercisesDone;
  }

  endTracking(completed: boolean) {
    this._currentWorkoutLog.completed = completed;
    this._currentWorkoutLog.endedOn = new Date().toISOString();
    this._currentWorkoutLog = null;
    this._tracking = false;
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
