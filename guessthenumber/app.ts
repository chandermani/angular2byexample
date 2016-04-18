//import 'zone.js';
//import 'reflect-metadata';
import {
Component, View, bootstrap
}from 'angular2/angular2';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
  <h2>Guess the Number !</h2>
  <p class="well lead">Guess the computer generated random number between 1 and 1000.</p>
  <label>Your Guess: </label>
  <input type="number" [value]="guess" (input)="guess = $event.target.value" />
  <button (click)="verifyGuess()" class="btn btn-primary btn-sm">Verify</button>
  <button (click)="initializeGame()" class="btn btn-warning btn-sm">Restart</button>
  <p>
    <p [hidden]="deviation>=0" class="alert alert-warning">Your guess is higher.</p>
    <p [hidden]="deviation<=0" class="alert alert-warning">Your guess is lower.</p>
    <p [hidden]="deviation!==0" class="alert alert-success">Yes! That"s it.</p>
  </p>
  <p class="text-info">No of guesses :
    <span class="badge">{{noOfTries}}</span>
  </p>
</div>
`
})
class GuessTheNumberComponent {
  deviation: number;
  noOfTries: number;
  original: number;
  guess: number;

  constructor() {
    this.initializeGame();
  }
  verifyGuess() {
    this.deviation = this.original - this.guess;
    this.noOfTries = this.noOfTries + 1;
  }
  initializeGame() {
    this.noOfTries = 0;
    this.original = Math.floor((Math.random() * 1000) + 1);
    this.guess = null;
    this.deviation = null;
  }
}

bootstrap(GuessTheNumberComponent);
