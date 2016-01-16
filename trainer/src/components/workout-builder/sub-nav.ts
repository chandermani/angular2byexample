import {Component, Input} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
@Component({
    selector: 'sub-nav',
    templateUrl: '/src/components/workout-builder/sub-nav.tpl.html',
    directives: [ROUTER_DIRECTIVES]
})
export class SubNav{
}
