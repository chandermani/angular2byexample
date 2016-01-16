import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {Exercise} from "./exercise";
import {Exercises} from "./exercises";
import {Workout} from "./workout";
import {Workouts} from "./workouts";
import {SubNav} from "./sub-nav";

@Component({
    template: `<div class="navbar navbar-default navbar-fixed-top second-top-nav">
                  <sub-nav></sub-nav>
               </div>
               <div class="container body-content app-container">
                  <router-outlet></router-outlet>
               </div>`,
    directives: [RouterOutlet, SubNav]
})
@RouteConfig([
    {path:'/workouts', name: 'Workouts', component: Workouts, useAsDefault: true},
    {path:'/workout', name:'WorkoutNew', component: Workout },
    {path:'/workout/:id', name:'Workout', component: Workout },
    {path:'/exercises', name: 'Exercises', component: Exercises},
    {path:'/exercise/new', name:'ExerciseNew', component: Exercise },
    {path:'/exercise/:id', name:'Exercise', component: Exercise }
])
export class WorkoutBuilder{
}