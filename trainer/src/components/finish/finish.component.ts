import {Component, Input} from '@angular/core';
import { Router, RouteSegment, RouteTree, OnActivate, ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'finish',
  templateUrl: '/src/components/finish/finish.html',
  directives: [ROUTER_DIRECTIVES]
})
export class FinishComponent implements OnActivate{
  public workoutName: string;

  constructor(private router:Router) {
  }

  routerOnActivate(current:RouteSegment,
                   prev?:RouteSegment,
                   currTree?:RouteTree,
                   prevTree?:RouteTree) {
    this.workoutName = current.urlSegments[1].segment;
  }
}