import {Component, ViewContainerRef} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {HeaderComponent} from './header.component';
import {Modal, BS_MODAL_PROVIDERS} from 'angular2-modal/plugins/bootstrap';
@Component({
  selector: 'trainer-app',
  viewProviders: [ ...BS_MODAL_PROVIDERS ],
  directives: [ROUTER_DIRECTIVES, HeaderComponent],
  template: `<div class="navbar navbar-default navbar-fixed-top top-navbar">
                <div class="container app-container">
                  <header></header>
                </div>
             </div>
             <div class="container body-content app-container">
                <router-outlet></router-outlet>
             </div>`
})
export class TrainerAppComponent {
  constructor(modal: Modal, viewContainer: ViewContainerRef) {
    modal.defaultViewContainer = viewContainer;
  }
}
