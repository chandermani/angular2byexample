import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'header',
  directives: [ROUTER_DIRECTIVES],
  template: `<div class="navbar-header">
                <h1>Personal Trainer</h1>
             </div>
             <ul class="nav navbar-nav navbar-right">
                <li *ngIf="showHistoryLink"><a [routerLink]="['History']" title="Workout History">History</a></li>
             </ul>`
})
export class Header {
  showHistoryLink: boolean;
  private _subscription: any;
  constructor(private _router: Router) {
    this._subscription = this._router.subscribe((data: any) => {
      this.showHistoryLink = data != 'workout';
    });
  }
}