import {Component, ViewChild, Inject, forwardRef} from '@angular/core';
import {MyAudio} from './my-audio'
import {WorkoutRunner} from './workout-runner'
import {WorkoutPlan, ExercisePlan, ExerciseProgressEvent, ExerciseChangedEvent} from './model';

@Component({
  selector: 'workout-audio',
  templateUrl: '/src/components/workout-runner/workout-audio.tpl.html',
  directives: [MyAudio]
})
export class WorkoutAudio {
  @ViewChild('ticks') private _ticks: MyAudio;
  @ViewChild('nextUp') private _nextUp: MyAudio;
  @ViewChild('nextUpExercise')private _nextUpExercise: MyAudio;
  @ViewChild('halfway') private _halfway: MyAudio;
  @ViewChild('aboutToComplete') private _aboutToComplete: MyAudio;
  private _nameSounds: Array<string>;
  private _nextupSound: string;
  private _subscriptions: Array<any>;

  constructor( @Inject(forwardRef(() => WorkoutRunner)) private _runner: WorkoutRunner) {
    this._subscriptions = [
      this._runner.exercisePaused.subscribe((exercise: ExercisePlan) => this.stop()),
      this._runner.workoutComplete.subscribe((exercise: ExercisePlan) => this.stop()),
      this._runner.exerciseResumed.subscribe((exercise: ExercisePlan) => this.resume()),
      this._runner.exerciseProgress.subscribe((progress: ExerciseProgressEvent) => this.onExerciseProgress(progress)),
      this._runner.exerciseChanged.subscribe((state: ExerciseChangedEvent) => this.onExerciseChanged(state))]
  }

  stop() {
    this._ticks.stop();
    this._nextUp.stop();
    this._halfway.stop();
    this._aboutToComplete.stop();
    this._nextUpExercise.stop();
  }

  resume() {
    this._ticks.start();
    if (this._nextUp.currentTime > 0 && !this._nextUp.playbackComplete) this._nextUp.start();
    else if (this._nextUpExercise.currentTime > 0 && !this._nextUpExercise.playbackComplete) this._nextUpExercise.start();
    else if (this._halfway.currentTime > 0 && !this._halfway.playbackComplete) this._halfway.start();
    else if (this._aboutToComplete.currentTime > 0 && !this._aboutToComplete.playbackComplete) this._aboutToComplete.start();
  }

  private onExerciseProgress(exercise: any) {
    if (exercise.runningFor == Math.floor(exercise.exercise.duration / 2)
      && exercise.exercise.exercise.name != "rest") {
      this._halfway.start();
    }
    else if (exercise.timeRemaining == 3) {
      this._aboutToComplete.start();
    }
  }

  private onExerciseChanged(state: any) {
    if (state.current.exercise.name == "rest") {
      this._nextupSound = state.next.exercise.nameSound;
      setTimeout(() => this._nextUp.start(), 2000);
      setTimeout(() => this._nextUpExercise.start(), 3000);
    }
  }

  ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
}
