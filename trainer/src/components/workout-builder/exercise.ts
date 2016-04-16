import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'exercise',
    templateUrl: '/src/components/workout-builder/exercise.tpl.html',
    directives: [ROUTER_DIRECTIVES]
})
export class Exercise{
}
