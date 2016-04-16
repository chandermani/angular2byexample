import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'builder',
    templateUrl: '/src/components/workout-builder/workout-builder.tpl.html',
    directives: [ROUTER_DIRECTIVES]
})
export class WorkoutBuilder{
}
