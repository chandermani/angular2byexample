import {Component} from 'angular2/angular2';
import {WorkoutPlan, ExercisePlan, Exercise, ExerciseRelated} from './model'

@Component({
  selector: 'workout-runner',
  template: `
    <pre>Current Exercise: {{currentExercise | json}}</pre>
    <pre>Time Left: {{currentExercise.duration-exerciseRunningDuration}}</pre>
  `
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
    this.restExercise = new ExercisePlan(new Exercise("rest", "Relax!", "Relax a bit", "img/rest.png"), 10);
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

    workout.exercises.push(
      new ExercisePlan(
        new Exercise(
          "wallSit",
          "Wall Sit",
          "A wall sit, also known as a Roman Chair, is an exercise done to strengthen the quadriceps muscles.",
          "wallsit.png",
          "",
          `Place your back against a wall with your feet shoulder width apart and a little ways out from the wall.
          Then, keeping your back against the wall, lower your hips until your knees form right angles.`,
          new ExerciseRelated(["//www.youtube.com/embed/y-wV4Venusw", "//www.youtube.com/embed/MMV3v4ap4ro"])),
        30));

    workout.exercises.push(
      new ExercisePlan(
        new Exercise(
          "pushUp",
          "Push up",
          "A push-up is a common exercise performed in a prone position by raising and lowering the body using the arms",
          "pushup.png",
          "",
          `Lie prone on the ground with hands placed as wide or slightly wider than shoulder width.
          Keeping the body straight, lower body to the ground by bending arms at the elbows.
          Raise body up off the ground by extending the arms.`,
          new ExerciseRelated(["//www.youtube.com/embed/Eh00_rniF8E", "//www.youtube.com/embed/ZWdBqFLNljc", "//www.youtube.com/embed/UwRLWMcOdwI", "//www.youtube.com/embed/ynPwl6qyUNM", "//www.youtube.com/embed/OicNTT2xzMI"])),
        30));

    workout.exercises.push(
      new ExercisePlan(
        new Exercise(
          "crunches",
          "Abdominal Crunches",
          "The basic crunch is a abdominal exercise in a strength-training program.",
          "crunches.png",
          "",
          `Lie on your back with your knees bent and feet flat on the floor, hip-width apart.
          Place your hands behind your head so your thumbs are behind your ears.
          Hold your elbows out to the sides but rounded slightly in.
          Gently pull your abdominals inward.
          Curl up and forward so that your head, neck, and shoulder blades lift off the floor.
          Hold for a moment at the top of the movement and then lower slowly back down.`,
          new ExerciseRelated(["//www.youtube.com/embed/Xyd_fa5zoEU", "//www.youtube.com/embed/MKmrqcoCZ-M"])),
        30));

    workout.exercises.push(
      new ExercisePlan(
        new Exercise(
          "stepUpOntoChair",
          "Step Up Onto Chair",
          "Step exercises are ideal for building muscle in your lower body.",
          "stepupontochair.png",
          "",
          `Position your chair in front of you.
          Stand with your feet about hip width apart, arms at your sides.
          Step up onto the seat with one foot, pressing down while bringing your other foot up next to it.
          Step back with the leading foot and bring the trailing foot down to finish one step-up.`,
          new ExerciseRelated(["//www.youtube.com/embed/aajhW7DD1EA"])),
        30));

        workout.exercises.push(
          new ExercisePlan(
            new Exercise(
              "stepUpOntoChair",
              "Step Up Onto Chair",
              "Step exercises are ideal for building muscle in your lower body.",
              "stepupontochair.png",
              "",
              `Position your chair in front of you.
              Stand with your feet about hip width apart, arms at your sides.
              Step up onto the seat with one foot, pressing down while bringing your other foot up next to it.
              Step back with the leading foot and bring the trailing foot down to finish one step-up.`,
              new ExerciseRelated(["//www.youtube.com/embed/aajhW7DD1EA"])),
            30));

    return workout;
  }
}
