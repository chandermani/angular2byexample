import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'left-nav-exercises',
    templateUrl: '/src/components/workout-builder/left-nav-exercises.tpl.html',
    directives: [ROUTER_DIRECTIVES]
})
export class LeftNavExercises{
}

