import {addProviders, fakeAsync, inject, tick} from '@angular/core/testing';
import {BaseRequestOptions, Http, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {WorkoutService} from './workout-service';
import {WorkoutPlan} from "./model";

describe('Workout Service', () => {
    let collectionUrl:string = 'https://api.mongolab.com/api/1/databases/personaltrainer/collections';
    let apiKey:string = '9xfTWt1ilKhqIqzV9Z_8jvCzo5ksjexx';
    let params:string = '?apiKey=' + apiKey;
    let workoutService:WorkoutService;
    let mockBackend:MockBackend;

    beforeEach(() => {
        addProviders([
            MockBackend,
            BaseRequestOptions,
            {
                provide: Http,
                useFactory: (backend:MockBackend, options:BaseRequestOptions) => {
                    return new Http(backend, options);
                },
                deps: [MockBackend, BaseRequestOptions]
            },
            WorkoutService
        ])
    });

    beforeEach(inject([WorkoutService, MockBackend], (service:WorkoutService, backend:MockBackend) => {
        workoutService = service;
        mockBackend = backend
    }));

    it("should load Workout service", () => {
        expect(workoutService).toBeDefined();
    });

    it("should return all workout plans", fakeAsync(() => {
        let result:any;
        mockBackend.connections.subscribe((connection:MockConnection) => {
            expect(connection.request.url).toBe(collectionUrl + "/workouts" + params);
            let response = new ResponseOptions({body: '[{ "name": "Workout1", "title": "workout1" }, { "name": "Workout1", "title": "workout1" }]'});
            connection.mockRespond(new Response(response));
        });
        workoutService.getWorkouts().subscribe((response:Response) => {
            result = response;
        });
        expect(result.length).toBe(2);
        expect(result[0] instanceof WorkoutPlan).toBe(true);
    }));

    it("should return a workout plan with a specific name", fakeAsync(() => {
        let result:any;
        mockBackend.connections.subscribe((connection:MockConnection) => {
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
        workoutService.getWorkout("Workout1").subscribe((response:Response) => {
            result = response;
        });
        expect(result.name).toBe('Workout1');
    }));

    it("should map exercises to workout plan correctly in getWorkout", fakeAsync(() => {
        let result:any;
        mockBackend.connections.subscribe((connection:MockConnection) => {
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
        workoutService.getWorkout("Workout1").subscribe((response:Response) => {
            result = response;
        });
        expect(result.name).toBe('Workout1');
        expect(result.exercises.length).toBe(2);
        expect(result.exercises[0].name).toBe("exercise2");
        expect(result.exercises[1].name).toBe("exercise4");
    }));
});
