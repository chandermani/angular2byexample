import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'sub-nav',
    templateUrl: '/src/components/workout-builder/navigation/sub-nav.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class SubNavComponent{
}
