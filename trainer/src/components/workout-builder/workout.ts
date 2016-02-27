import {Component, Input, Injector} from 'angular2/core';
import {CanActivate, OnActivate, RouteData, ROUTER_DIRECTIVES, ComponentInstruction, RouteParams} from 'angular2/router';
import {FORM_DIRECTIVES} from 'angular2/common';
import {LeftNavExercises} from "./left-nav-exercises";
import {WorkoutBuilderService} from "../../services/workout-builder-service";
import {Exercise, WorkoutPlan, ExercisePlan} from "../../services/model";
import {WorkoutService} from "../../services/workout-service";
import {SecondsToTime} from "../workout-runner/pipes";
import {BusyIndicator} from "./busy-indicator";
import {RemoteValidator} from "./remote-validator";

@Component({
  selector: 'workout',
  templateUrl: '/src/components/workout-builder/workout.tpl.html',
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES, LeftNavExercises, BusyIndicator, RemoteValidator],
  pipes: [SecondsToTime]
})
@CanActivate((to: ComponentInstruction, from: ComponentInstruction) => {
  return new Promise((resolve) => {
    let injector = Injector.resolveAndCreate([WorkoutBuilderService, WorkoutService]);
    let workoutBuilderService = injector.get(WorkoutBuilderService);
    let workoutName: String;

    if (to.urlPath === "workout/new") {
      workoutName = "";
    } else {
      workoutName = to.params["id"];
    }

    let workout = workoutBuilderService.startBuilding(workoutName);
    if (workout) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
})
export class Workout implements OnActivate {
  public workout: WorkoutPlan;
  public submitted: boolean = false;

  constructor(private _workoutBuilderService: WorkoutBuilderService, private _routeParams: RouteParams) {
  }

  addExercise(exercisePlan: ExercisePlan) {
    this._workoutBuilderService.addExercise(exercisePlan);
  }

  moveExerciseTo(exercisePlan: ExercisePlan, location: any) {
    this._workoutBuilderService.moveExerciseTo(exercisePlan, location);
  }

  removeExercise(exercisePlan: ExercisePlan) {
    this._workoutBuilderService.removeExercise(exercisePlan);
  }

  routerOnActivate(to: ComponentInstruction, from: ComponentInstruction) {
    return new Promise((resolve) => {
      let workoutName: string;
      if (to.urlPath === "workout/new") {
        workoutName = "";
      } else {
        workoutName = to.params["id"];
      }
      this.workout = this._workoutBuilderService.startBuilding(workoutName);

      if (this.workout) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  }

  save(formWorkout: any) {
    this.submitted = true;
    if (!formWorkout.valid) return;
    this._workoutBuilderService.save();
  }

  // TODO: Replace this function once the backend integration is available.
  validateWorkoutName = (name: string) => {
    if (this._routeParams.get("id") === name) return Promise.resolve(true);
    return new Promise((resolve) => {
      const workoutNames: Array<string> = ['7MinWorkout'];
      setTimeout(() => {
        resolve(workoutNames.indexOf(name) >= 0 ? false : true);
      }, 2000);
    });
  }

  durations = [{ title: "15 seconds", value: 15 },
    { title: "30 seconds", value: 30 },
    { title: "45 seconds", value: 45 },
    { title: "1 minute", value: 60 },
    { title: "1 minute 15 seconds", value: 75 },
    { title: "1 minute 30 seconds", value: 90 },
    { title: "1 minute 45 seconds", value: 105 },
    { title: "2 minutes", value: 120 },
    { title: "2 minutes 15 seconds", value: 135 },
    { title: "2 minutes 30 seconds", value: 150 },
    { title: "2 minutes 45 seconds", value: 165 },
    { title: "3 minutes", value: 180 },
    { title: "3 minutes 15 seconds", value: 195 },
    { title: "3 minutes 30 seconds", value: 210 },
    { title: "3 minutes 45 seconds", value: 225 },
    { title: "4 minutes", value: 240 },
    { title: "4 minutes 15 seconds", value: 255 },
    { title: "4 minutes 30 seconds", value: 270 },
    { title: "4 minutes 45 seconds", value: 285 },
    { title: "5 minutes", value: 300 }];
}
