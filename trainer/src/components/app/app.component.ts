import { Component, ViewContainerRef } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Modal, BS_MODAL_PROVIDERS } from 'angular2-modal/plugins/bootstrap';

import { FinishComponent } from '../finish/finish.component';
import { HeaderComponent } from './header.component';
import { StartComponent } from '../start/start.component';
import { WorkoutBuilderComponent } from "../workout-builder/workout-builder.component";
import { WorkoutContainerCompnent } from '../workout-runner/workout-container/workout-container.component';
import { WorkoutHistoryComponent } from '../workout-history/workout-history.component';
import { WorkoutRunnerComponent } from '../workout-runner/workout-runner.component';

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
  { path: '/workout/:id', component: WorkoutContainerCompnent },
  { path: '/workout', component: WorkoutContainerCompnent },
  { path: '/finish/:id', component: FinishComponent },
  { path: '/finish', component: FinishComponent },
  { path: '/history', component: WorkoutHistoryComponent },
  { path: '/builder', component: WorkoutBuilderComponent },
  { path: '/', component: StartComponent }
])
export class TrainerAppComponent {
  constructor(private router: Router, modal: Modal, viewContainer: ViewContainerRef) {
    modal.defaultViewContainer = viewContainer;
  }
}
