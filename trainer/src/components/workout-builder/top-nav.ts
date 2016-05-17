import {Component, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
@Component({
    selector: 'top-nav',
    templateUrl: '/src/components/workout-builder/top-nav.tpl.html',
    directives: [ROUTER_DIRECTIVES]
})
export class TopNav{
}
