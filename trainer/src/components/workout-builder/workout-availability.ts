import {provide, Directive} from 'angular2/core';
import {
NG_ASYNC_VALIDATORS,
Control,
Validators,
Validator
} from 'angular2/common';

@Directive({
  selector: '[WorkoutAvailability][ngControl],[WorkoutAvailability][ngFormControl],[WorkoutAvailability][ngModel]',
  providers: [
    provide(NG_ASYNC_VALIDATORS, {
      useExisting: WorkoutAvailabilityValidator,
      multi: true
    })
  ]
})

export class WorkoutAvailabilityValidator implements Validator {
  validate(control: Control): { [key: string]: any } {
    let workoutName: string = control.value;
    return new Promise((resolve) => {
      const workoutNames: Array<string> = ['7MinWorkout'];
      setTimeout(() => {
        resolve(
          workoutNames.indexOf(workoutName) >= 0
            ? { 'WorkoutAvailability': true }
            : null
          );
      }, 2000);
    });
  }
}
