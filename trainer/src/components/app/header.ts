import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'header',
  directives: [ROUTER_DIRECTIVES],
  template: `<div class="navbar-header">
                <h1>7 Minute Workout</h1>
             </div>
             <ul class="nav navbar-nav navbar-right">
                <li><a [routerLink]="['History']" title="Workout History">History</a></li>
             </ul>`
})
export class Header {}