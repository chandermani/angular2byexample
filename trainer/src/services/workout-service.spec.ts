import { inject, fakeAsync, async, TestBed } from '@angular/core/testing';
import {HttpModule, Http, XHRBackend, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import {WorkoutService} from './workout-service';
import {WorkoutPlan} from "./model";

const makeWorkoutData = () => [
    { name: "Workout1", title: "workout1" },
    { name: "Workout2", title: "workout2" },
    { name: "Workout3", title: "workout3" },
    { name: "Workout4", title: "workout4" }
] as WorkoutPlan[];

describe('Workout Service', () => {
    let collectionUrl:string = 'https://api.mongolab.com/api/1/databases/personaltrainer/collections';
    let apiKey:string = '9xfTWt1ilKhqIqzV9Z_8jvCzo5ksjexx';
    let params:string = '?apiKey=' + apiKey;
    let workoutService:WorkoutService;
    let mockBackend:MockBackend;
    let fixture:any;

    beforeEach( async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpModule ],
            providers: [
                WorkoutService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
    }));

    it('can instantiate service when inject service',
        inject([WorkoutService], (service: WorkoutService) => {
            expect(service instanceof WorkoutService).toBe(true);
        }));

    it('can instantiate service with "new"', inject([Http], (http: Http) => {
        expect(http).not.toBeNull('http should be provided');
        let service = new WorkoutService(http);
        expect(service instanceof WorkoutService).toBe(true, 'new service should be ok');
    }));


    it('can provide the mockBackend as XHRBackend',
        inject([XHRBackend], (backend: MockBackend) => {
            expect(backend).not.toBeNull('backend should be provided');
        }));

    it("should return all workout plans", fakeAsync((inject([XHRBackend, WorkoutService], (backend: MockBackend, service:WorkoutService) => {
        let result:any;
        backend.connections.subscribe((connection:MockConnection) => {
            expect(connection.request.url).toBe(collectionUrl + "/workouts" + params);
            let response = new ResponseOptions({body: '[{ "name": "Workout1", "title": "workout1" }, { "name": "Workout1", "title": "workout1" }]'});
            connection.mockRespond(new Response(response));
        });
        service.getWorkouts().subscribe((response:Response) => {
            result = response;
        });
        expect(result.length).toBe(2);
        expect(result[0] instanceof WorkoutPlan).toBe(true);
    }))));

    it("should return a workout plan with a specific name", fakeAsync((inject([XHRBackend, WorkoutService], (backend: MockBackend, service:WorkoutService) => {
        let result:any;
        backend.connections.subscribe((connection:MockConnection) => {
            if (connection.request.url === collectionUrl + "/workouts/Workout1" + params) {
                let response = new ResponseOptions({
                    body: '{ "name" : "Workout1" , "title" : "Workout 1" , "exercises" : [ { "name" : "exercise1" , "duration" : 30}]}'
                });
                connection.mockRespond(new Response(response));
            } else {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        body: [{name: "exercise1", title: "exercise 1"}]
                    })));
            }
        });
        service.getWorkout("Workout1").subscribe((response:Response) => {
            result = response;
        });
        expect(result.name).toBe('Workout1');
    }))));

    it("should map exercises to workout plan correctly in getWorkout", fakeAsync((inject([XHRBackend, WorkoutService], (backend: MockBackend, service:WorkoutService) => {
        let result:any;
        backend.connections.subscribe((connection:MockConnection) => {
            if (connection.request.url === collectionUrl + "/workouts/Workout1" + params) {
                let response = new ResponseOptions({
                    body: { name: "Workout1", title: "Workout 1", restBetweenExercise: 30, exercises: [{ name: "exercise2", duration: 31 }, { name: "exercise4", duration: 31 }] }
                });
                connection.mockRespond(new Response(response));
            } else {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        body: [{ name: "exercise1", title: "exercise 1" }, { name: "exercise2", title: "exercise 2" }, { name: "exercise3", title: "exercise 3" }, { name: "exercise4", title: "exercise 4" }]
                    })));
            }
        });
        service.getWorkout("Workout1").subscribe((response:Response) => {
            result = response;
        });
        expect(result.name).toBe('Workout1');
        expect(result.exercises.length).toBe(2);
        expect(result.exercises[0].name).toBe("exercise2");
        expect(result.exercises[1].name).toBe("exercise4");
    }))));
});

