import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {LeftNavMain} from "./left-nav-main";

@Component({
    selector: 'exercises',
    templateUrl: '/src/components/workout-builder/exercises.tpl.html',
    directives: [ROUTER_DIRECTIVES, LeftNavMain]
})
export class Exercises{
}

