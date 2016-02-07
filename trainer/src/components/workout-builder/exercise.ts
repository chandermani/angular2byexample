import {Component, Input, Injector} from 'angular2/core';
import {CanActivate, OnActivate, RouteData, ROUTER_DIRECTIVES, ComponentInstruction} from 'angular2/router';
import {FORM_DIRECTIVES} from 'angular2/common';
import {ExerciseBuilderService} from "../../services/exercise-builder-service";
import {ExercisePlan} from "../../services/model";
import {WorkoutService} from "../../services/workout-service";
import {SecondsToTime} from "../workout-runner/pipes";

@Component({
    selector: 'exercise',
    templateUrl: '/src/components/workout-builder/exercise.tpl.html',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Exercise{
}
