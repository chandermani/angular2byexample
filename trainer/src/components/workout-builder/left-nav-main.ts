import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'left-nav-main',
    templateUrl: '/src/components/workout-builder/left-nav-main.tpl.html',
    directives: [ROUTER_DIRECTIVES]
})
export class LeftNavMain{
}

