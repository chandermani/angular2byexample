import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'builder',
    templateUrl: '/src/components/workout-builder/workout-builder.tpl.html',
    directives: [ROUTER_DIRECTIVES]
})
export class WorkoutBuilder{
}
