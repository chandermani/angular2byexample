import {Component, Input} from 'angular2/core';

@Component({
  selector: 'exercise-description',
  templateUrl: '/src/components/workout-runner/exercise-description.tpl.html',
})
export class ExerciseDescription {
  @Input() description: string;
  @Input() steps: string;
}
