import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {Exercise} from "./exercise";
import {Exercises} from "./exercises";
import {Workout} from "./workout";
import {Workouts} from "./workouts";
import {TopNav} from "./top-nav";

@Component({
    template: `<div class="navbar navbar-default navbar-fixed-top second-top-nav">
                  <top-nav></top-nav>
               </div>
               <div class="container body-content app-container">
                  <router-outlet></router-outlet>
               </div>`,
    directives: [RouterOutlet, TopNav]
})
@RouteConfig([
    {path:'/workouts', name: 'Workouts', component: Workouts, useAsDefault: true},
    {path:'/workouts/new', name:'WorkoutNew', component: Workout },
    {path:'/workouts/:id', name:'Workout', component: Workout },
    {path:'/exercises', name: 'Exercises', component: Exercises},
    {path:'/exercises/new', name:'ExerciseNew', component: Exercise },
    {path:'/exercises/:id', name:'Exercise', component: Exercise }
])
export class WorkoutBuilder{
}