import {Component, NgStyle} from 'angular2/angular2';
import {WorkoutPlan, ExercisePlan, Exercise, ExerciseRelated} from './model';
import {ExerciseDescription} from './exercise-description';
import {VideoPlayer} from './video-player';

@Component({
  selector: 'workout-runner',
  templateUrl: '/src/components/workout-runner/workout-runner.tpl.html',
  directives: [NgStyle, ExerciseDescription, VideoPlayer]
})
export class WorkoutRunner {
  workoutPlan: WorkoutPlan;
  workoutTimeRemaining: number;
  restExercise: ExercisePlan;
  currentExerciseIndex: number;
  currentExercise: ExercisePlan;
  exerciseRunningDuration: number

  constructor() {
    this.workoutPlan = this.buildWorkout();
    this.restExercise = new ExercisePlan(new Exercise("rest", "Relax!", "Relax a bit", "img/rest.png"), 30);
  }
  onInit() {
    this.start();
  }

  start() {
    this.workoutTimeRemaining = this.workoutPlan.totalWorkoutDuration();
    this.currentExerciseIndex = 0;
    this.startExercise(this.workoutPlan.exercises[0]);
  }

  startExercise(exercisePlan: ExercisePlan) {
    this.currentExercise = exercisePlan;
    this.exerciseRunningDuration = 0;
    let intervalId = setInterval(() => {
      if (this.exerciseRunningDuration >= this.currentExercise.duration) {
        clearInterval(intervalId);
        let next: ExercisePlan = this.getNextExercise();
        if (next) {
          this.startExercise(next);
        }
        else {
          console.log("Workout complete!");
        }
      }
      else {
        this.exerciseRunningDuration++;
      }
    }, 1000, this.currentExercise.duration);
  }

  getNextExercise(): ExercisePlan {
    let nextExercise: ExercisePlan = null;
    if (this.currentExercise === this.restExercise) {
      this.currentExerciseIndex++;
      nextExercise = this.workoutPlan.exercises[this.currentExerciseIndex];
    }
    else if (this.currentExerciseIndex < this.workoutPlan.exercises.length - 1) {
      nextExercise = this.restExercise;
    }

    return nextExercise;
  }

  buildWorkout(): WorkoutPlan {
    let workout = new WorkoutPlan("7MinWorkout", "7 Minute Workout", 10, []);
    workout.exercises.push(
      new ExercisePlan(
        new Exercise(
          "jumpingJacks",
          "Jumping Jacks",
          "A jumping jack or star jump, also called side-straddle hop is a physical jumping exercise.",
          "JumpingJacks.png",
          "",
          `Assume an erect position, with feet together and arms at your side.
                            Slightly bend your knees, and propel yourself a few inches into the air.
                            While in air, bring your legs out to the side about shoulder width or slightly wider.
                            As you are moving your legs outward, you should raise your arms up over your head; arms should be slightly bent throughout the entire in-air movement.
                            Your feet should land shoulder width or wider as your hands meet above your head with arms slightly bent`,
          new ExerciseRelated(["//www.youtube.com/embed/dmYwZH_BNd0", "//www.youtube.com/embed/BABOdJ-2Z6o", "//www.youtube.com/embed/c4DAnQ6DtF8"])),
        30));
    return workout;
  }
}
