import {Injectable} from '@angular/core';

@Injectable()
export class WorkoutPlan {
  constructor(
    public name: string,
    public title: string,
    public restBetweenExercise: number,
    public exercises: ExercisePlan[],
    public description?: string) {
  }

  totalWorkoutDuration(): number {
    if (!this.exercises) return 0;

    let total = this.exercises.map((e) => e.duration).reduce((previous, current) => parseInt(previous) + parseInt(current));

    return ((this.restBetweenExercise ? this.restBetweenExercise : 0) * (this.exercises.length - 1)) + total;
  }
}

@Injectable()
export class ExercisePlan {
  constructor(public exercise: Exercise, public duration: any) {
  }
}

export class Exercise {

  constructor(
    public name: string,
    public title: string,
    public description: string,
    public image: string,
    public nameSound?: string,
    public procedure?: string,
    public videos?: Array<string>) { }
}

export class ExerciseProgressEvent {
  constructor(
    public exercise: ExercisePlan,
    public runningFor: number,
    public timeRemaining: number,
    public workoutTimeRemaining: number) { }
}

export class ExerciseChangedEvent {
  constructor(
    public current: ExercisePlan,
    public next: ExercisePlan
    ) { }
}
