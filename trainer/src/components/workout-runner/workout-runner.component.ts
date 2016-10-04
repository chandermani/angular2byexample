import {Component, ViewChild, EventEmitter, Output, Input, OnInit, DoCheck, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {WorkoutPlan, ExercisePlan, Exercise, ExerciseProgressEvent, ExerciseChangedEvent} from '../../services/model';
import {WorkoutHistoryTracker} from '../../services/workout-history-tracker';
import {WorkoutService} from "../../services/workout-service";

@Component({
  selector: 'workout-runner',
  templateUrl: '/src/components/workout-runner/workout-runner.html'
})
export class WorkoutRunnerComponent implements OnInit, DoCheck, OnDestroy {
    workoutPlan:WorkoutPlan;
    workoutTimeRemaining:number;
    restExercise:ExercisePlan;
    currentExerciseIndex:number;
    currentExercise:ExercisePlan;
    exerciseRunningDuration:number;
    exerciseTrackingInterval:number;
    workoutPaused:boolean;
    dataLoaded:boolean = false;
    @Input() workoutName:string;
    @Output() exercisePaused:EventEmitter<number> = new EventEmitter<number>();
    @Output() exerciseResumed:EventEmitter<number> = new EventEmitter<number>();
    @Output() exerciseProgress:EventEmitter<ExerciseProgressEvent> = new EventEmitter<any>();
    @Output() exerciseChanged:EventEmitter<ExerciseChangedEvent> = new EventEmitter<any>();
    @Output() workoutStarted:EventEmitter<WorkoutPlan> = new EventEmitter<WorkoutPlan>();
    @Output() workoutComplete:EventEmitter<WorkoutPlan> = new EventEmitter<WorkoutPlan>();

    constructor(private router:Router,
                private tracker:WorkoutHistoryTracker,
                private workoutService:WorkoutService) {
    }

    ngOnInit() {
        this.getWorkout(this.workoutName);
    }

    ngDoCheck():any {
        if (!this.dataLoaded) {
            this.start();
        }
    }

    getWorkout(name:string) {
        this.workoutService.getWorkout(name)
            .subscribe(
                (data:WorkoutPlan) => {
                    this.workoutPlan = data;
                },
                (err:any) => {
                    console.error(err)
                }
            );
    }

    start() {
        if(this.workoutPlan)
        {
            this.dataLoaded = true;
            this.restExercise = new ExercisePlan(new Exercise("rest", "Relax!", "Relax a bit", "rest.png"), this.workoutPlan.restBetweenExercise);
            this.tracker.startTracking();
            this.workoutTimeRemaining = this.workoutPlan.totalWorkoutDuration();
            this.currentExerciseIndex = 0;
            this.startExercise(this.workoutPlan.exercises[this.currentExerciseIndex]);
            this.workoutStarted.emit(this.workoutPlan);
         }
    }

    pause() {
        clearInterval(this.exerciseTrackingInterval);
        this.workoutPaused = true;
        this.exercisePaused.emit(this.currentExerciseIndex);
    }

    resume() {
        this.startExerciseTimeTracking();
        this.workoutPaused = false;
        this.exerciseResumed.emit(this.currentExerciseIndex);
    }

    pauseResumeToggle() {
        if (this.workoutPaused) {
            this.resume();
        }
        else {
            this.pause();
        }
    }

    onKeyPressed = function (event:KeyboardEvent) {
        if (event.which == 80 || event.which == 112) {        // 'p' or 'P' key to toggle pause and resume.
            this.pauseResumeToggle();
        }
    }

    startExercise(exercisePlan:ExercisePlan) {
        this.currentExercise = exercisePlan;
        this.exerciseRunningDuration = 0;
        this.startExerciseTimeTracking();
    }

    getNextExercise():ExercisePlan {
        let nextExercise:ExercisePlan = null;
        if (this.currentExercise === this.restExercise) {
            nextExercise = this.workoutPlan.exercises[this.currentExerciseIndex + 1];
        }
        else if (this.currentExerciseIndex < this.workoutPlan.exercises.length - 1) {
            nextExercise = this.restExercise;
        }
        return nextExercise;
    }

    startExerciseTimeTracking() {
        this.exerciseTrackingInterval = window.setInterval(() => {
            if (this.exerciseRunningDuration >= this.currentExercise.duration) {
                clearInterval(this.exerciseTrackingInterval);
                if (this.currentExercise !== this.restExercise) {
                    this.tracker.exerciseComplete(this.workoutPlan.exercises[this.currentExerciseIndex]);
                }
                let next:ExercisePlan = this.getNextExercise();
                if (next) {
                    if (next !== this.restExercise) {
                        this.currentExerciseIndex++;
                    }
                    this.startExercise(next);
                    this.exerciseChanged.emit(new ExerciseChangedEvent(next, this.getNextExercise()));
                }
                else {
                    this.tracker.endTracking(true);
                    this.workoutComplete.emit(this.workoutPlan);
                    this.router.navigate(['/finish', this.workoutName]);
                }
                return;
            }
            ++this.exerciseRunningDuration;
            --this.workoutTimeRemaining;
            this.exerciseProgress.emit(new ExerciseProgressEvent(
                this.currentExercise,
                this.exerciseRunningDuration,
                this.currentExercise.duration - this.exerciseRunningDuration,
                this.workoutTimeRemaining
            ));
        }, 1000);
    }

    ngOnDestroy() {
    this.tracker.endTracking(false);
        if (this.exerciseTrackingInterval) clearInterval(this.exerciseTrackingInterval);
    }
}
