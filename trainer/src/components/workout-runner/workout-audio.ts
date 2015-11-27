import {Component, ContentChild, ViewChild, ViewChildren, ElementRef, QueryList, Host, Injector} from 'angular2/angular2';
import {MyAudio} from './my-audio'
import {WorkoutRunner} from './workout-runner'
import {WorkoutPlan, ExercisePlan} from './model';

@Component({
  selector: 'workout-audio',
  templateUrl: '/src/components/workout-runner/workout-audio.tpl.html',
  directives: [MyAudio]
})
export class WorkoutAudio {
  @ViewChild('ticks') ticks: MyAudio;
  @ViewChild('nextUp') nextUp: MyAudio;
  @ViewChild('nextUpExercise') nextUpExercise: MyAudio;
  @ViewChild('halfway') halfway: MyAudio;
  @ViewChild('aboutToComplete') aboutToComplete: MyAudio;
  private runner: WorkoutRunner;
  private nameSounds: Array<string>;
  private nextupSound: string;

  constructor(public injector: Injector) {
    this.runner = this.injector.get(WorkoutRunner);

    this.runner.exercisePaused.subscribe((exercise: ExercisePlan) => this.stop());
    this.runner.workoutComplete.subscribe((exercise: ExercisePlan) => this.stop());
    this.runner.exerciseResumed.subscribe((exercise: ExercisePlan) => this.resume());
    this.runner.exerciseProgress.subscribe((progress: any) => this.onExerciseProgress(progress));
    this.runner.exerciseChanged.subscribe((state: any) => this.onExerciseChanged(state));

  }

  /*afterViewInit() {
    console.log(this.ticks);
  }*/

  stop() {
    this.ticks.stop();
    this.nextUp.stop();
    this.halfway.stop();
    this.aboutToComplete.stop();
    this.nextUpExercise.stop();
  }

  resume() {
    this.ticks.start();
    console.log(this.nextUp.currentTime());
    console.log(this.nextUpExercise.currentTime());
    console.log(this.halfway.currentTime());
    console.log(this.aboutToComplete.currentTime());

    if (this.nextUp.currentTime() > 0 && !this.nextUp.playbackComplete()) this.nextUp.start();
    else if (this.nextUpExercise.currentTime() > 0 && !this.nextUpExercise.playbackComplete()) this.nextUpExercise.start();
    else if (this.halfway.currentTime() > 0 && !this.halfway.playbackComplete()) this.halfway.start();
    else if (this.aboutToComplete.currentTime() > 0 && !this.aboutToComplete.playbackComplete()) this.aboutToComplete.start();
  }

  private onExerciseProgress(progress: any) {
    if (progress.runningFor == Math.floor(progress.exercise.duration / 2)
      && progress.exercise.exercise.name != "rest") {
      this.halfway.start();
    }
    else if (progress.timeRemaining == 3) {
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

  private onWorkoutStarted(workout: WorkoutPlan) {

  }
}
