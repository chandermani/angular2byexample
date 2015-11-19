import {Component} from 'angular2/angular2';
import {WorkoutRunner} from '../workout-runner/workout-runner';
@Component({
    selector: 'trainer-app',
    directives:[WorkoutRunner],
    template: `<workout-runner></workout-runner>`
})
export class TrainerApp {
    name: string = 'World';
}
