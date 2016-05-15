import {Component, ViewContainerRef} from '@angular/core';
import {WorkoutContainer} from '../workout-runner/workout-container';
import {Start} from '../workout-runner/start';
import {Finish} from '../workout-runner/finish';
import {WorkoutHistory} from './workout-history';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {Header} from './header';
import {Modal, BS_MODAL_PROVIDERS} from 'angular2-modal/plugins/bootstrap';
@Component({
  selector: 'trainer-app',
  viewProviders: [ ...BS_MODAL_PROVIDERS ],
  directives: [ROUTER_DIRECTIVES, Header],
  template: `<div class="navbar navbar-default navbar-fixed-top top-navbar">
                <div class="container app-container">
                  <header></header>
                </div>
             </div>
             <div class="container body-content app-container">
                <router-outlet></router-outlet>
             </div>`
})
@Routes([
  { path: '/start', component: Start },
  { path: '/workout', component: WorkoutContainer },
  { path: '/finish', component: Finish },
  { path: '/history', component: WorkoutHistory },
  { path: '/', component: Start }
])
export class TrainerApp {
  constructor(private router: Router, modal: Modal, viewContainer: ViewContainerRef) {
    modal.defaultViewContainer = viewContainer;
  }
}
