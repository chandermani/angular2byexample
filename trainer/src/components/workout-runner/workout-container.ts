import {Component, Input} from '@angular/core';
import {WorkoutAudio} from './workout-audio';
import {WorkoutRunner} from './workout-runner';
@Component({
  selector: 'workout-container',
  templateUrl: '/src/components/workout-runner/workout-container.tpl.html',
  directives:[WorkoutAudio,WorkoutRunner]
})
export class WorkoutContainer { }
