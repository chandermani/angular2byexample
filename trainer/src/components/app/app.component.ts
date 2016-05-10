import {Component, ViewContainerRef} from '@angular/core';
import {WorkoutRunnerComponent} from '../workout-runner/workout-runner.component';
import {StartComponent} from '../start/start.component';
import {FinishComponent} from '../finish/finish.component';
import {WorkoutHistoryComponent} from '../workout-history/workout-history.component';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
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
@Routes([
  { path: '/start', component: StartComponent },
  { path: '/workout', component: WorkoutRunnerComponent },
  { path: '/finish', component: FinishComponent },
  { path: '/history', component: WorkoutHistoryComponent },
  { path: '/', component: StartComponent }
])
export class TrainerAppComponent {
  constructor(private router: Router, modal: Modal, viewContainer: ViewContainerRef) {
    modal.defaultViewContainer = viewContainer;
  }
}
