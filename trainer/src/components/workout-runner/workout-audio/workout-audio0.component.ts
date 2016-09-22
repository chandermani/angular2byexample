import {Component, ViewChild, Inject, forwardRef} from '@angular/core';
import {MyAudioDirective} from './my-audio.directive'
import {WorkoutRunnerComponent} from '../workout-runner.component'
import {WorkoutPlan, ExercisePlan, ExerciseProgressEvent, ExerciseChangedEvent} from '../../../services/model';

@Component({
  selector: 'workout-audio',
  templateUrl: '/src/components/workout-runner/workout-audio/workout-audio.html'
})
export class WorkoutAudioComponent {
  @ViewChild('ticks') private ticks: MyAudioDirective;
  @ViewChild('nextUp') private nextUp: MyAudioDirective;
  @ViewChild('nextUpExercise') private nextUpExercise: MyAudioDirective;
  @ViewChild('halfway') private halfway: MyAudioDirective;
  @ViewChild('aboutToComplete') private aboutToComplete: MyAudioDirective;
  private nameSounds: Array<string>;
  private nextupSound: string;
  private subscriptions: Array<any>;

  constructor( @Inject(forwardRef(() => WorkoutRunnerComponent)) private runner: WorkoutRunnerComponent) {
    this.subscriptions = [
      this.runner.exercisePaused.subscribe((exercise: ExercisePlan) => this.stop()),
      this.runner.workoutComplete.subscribe((exercise: ExercisePlan) => this.stop()),
      this.runner.exerciseResumed.subscribe((exercise: ExercisePlan) => this.resume()),
      this.runner.exerciseProgress.subscribe((progress: ExerciseProgressEvent) => this.onExerciseProgress(progress)),
      this.runner.exerciseChanged.subscribe((state: ExerciseChangedEvent) => this.onExerciseChanged(state))]
  }

  stop() {
    this.ticks.stop();
    this.nextUp.stop();
    this.halfway.stop();
    this.aboutToComplete.stop();
    this.nextUpExercise.stop();
  }

  resume() {
    this.ticks.start();
    if (this.nextUp.currentTime > 0 && !this.nextUp.playbackComplete) this.nextUp.start();
    else if (this.nextUpExercise.currentTime > 0 && !this.nextUpExercise.playbackComplete) this.nextUpExercise.start();
    else if (this.halfway.currentTime > 0 && !this.halfway.playbackComplete) this.halfway.start();
    else if (this.aboutToComplete.currentTime > 0 && !this.aboutToComplete.playbackComplete) this.aboutToComplete.start();
  }

  private onExerciseProgress(exercise: any) {
    if (exercise.runningFor == Math.floor(exercise.exercise.duration / 2)
      && exercise.exercise.exercise.name != "rest") {
      this.halfway.start();
    }
    else if (exercise.timeRemaining == 3) {
      this.aboutToComplete.start();
    }
  }

  private onExerciseChanged(state: any) {
    if (state.current.exercise.name == "rest") {
      this.nextupSound = state.next.exercise.nameSound;
      setTimeout(() => this.nextUp.start(), 2000);
      setTimeout(() => this.nextUpExercise.start(), 3000);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
