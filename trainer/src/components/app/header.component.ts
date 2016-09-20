import {Component} from '@angular/core';

@Component({
  selector: 'header',
  template: `<div class="navbar-header">
                <h1>7 Minute Workout</h1>
             </div>
             <ul class="nav navbar-nav navbar-right">
                <li><a [routerLink]="['history']" title="Workout History">History</a></li>
             </ul>`
})
export class HeaderComponent { }
