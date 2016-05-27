import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  selector: 'header',
  directives: [ROUTER_DIRECTIVES],
  template: `<div class="navbar-header">
                <h1>Personal Trainer</h1>
             </div>
             <ul class="nav navbar-nav navbar-right">
                <li *ngIf="showHistoryLink"><a [routerLink]="['history']" title="Workout History">History</a></li>
             </ul>`
})
export class HeaderComponent {
  showHistoryLink: boolean = true;
  private subscription: any;
  constructor(private router: Router) {
    // TODO: This needs to be fixed once the router has capability to get current route
    //this.subscription = this.router.changes.subscribe((data: any) => {
    //  this.showHistoryLink = data != 'workout';
    //});
  }
}