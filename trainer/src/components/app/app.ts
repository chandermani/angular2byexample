import {Component} from 'angular2/core';

@Component({
    selector: 'trainer-app',
    template: `
        <h1>Hello, {{name}}!</h1>
        Say hello to: <input [value]="name" (input)="name = $event.target.value">
    `
})
export class TrainerApp {
    name: string = 'World';
}
