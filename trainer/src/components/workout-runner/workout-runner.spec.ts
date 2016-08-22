import { inject, addProviders, fakeAsync, tick } from '@angular/core/testing';
/*import {APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS, RouteConfig, RouteRegistry} from 'angular2/router';*/
import {provide, ApplicationRef} from '@angular/core';

import {WorkoutHistoryTracker} from '../../services/workout-history-tracker';
import {FinishComponent} from "../finish/finish.component";
import {WorkoutRunnerComponent} from "./workout-runner.component";

class MockWorkoutHistoryTracker {
    startTracking() {}
    endTracking() {}
    exerciseComplete() {}
    tracking: any;
}

/*@RouteConfig([
    { path: '', name: 'Finish', component: FinishComponent },
])*/
class MockPrimaryComponent {
}

describe('Workout Runner', () =>{
    let component:any;
    let router:any;

    beforeEach(() =>{
        addProviders([
            WorkoutRunnerComponent,
            provide(WorkoutHistoryTracker, {useClass: MockWorkoutHistoryTracker}),
/*            ROUTER_PROVIDERS,
            RouteRegistry,
            // provide(ApplicationRef, {useClass: MockApplicationRef}),
            provide(APP_BASE_HREF, {useValue: '/'}),
            provide(ROUTER_PRIMARY_COMPONENT, {useValue: MockPrimaryComponent})*/
        ])
    });

    xit('should load the component', inject([WorkoutRunnerComponent], (runner: WorkoutRunnerComponent) => {
        expect(runner).toBeDefined();
    }));

/*    it('should start the workout', inject([WorkoutRunnerComponent], (runner: WorkoutRunnerComponent) => {
        runner.workoutStarted.subscribe((w: any) => {
            expect(w).toEqual(runner.workoutPlan);
        })
        runner.ngOnInit();
        expect(runner.workoutPlan).toEqual(runner.buildWorkout());
        expect(runner.workoutTimeRemaining).toEqual(runner.workoutPlan.totalWorkoutDuration());
        expect(runner.workoutPaused).toBeFalsy();
    }));*/

    xit('should start the first exercise', inject([WorkoutRunnerComponent], (runner: WorkoutRunnerComponent) => {
        spyOn(runner, 'startExercise').and.callThrough();
        runner.ngOnInit();
        expect(runner.currentExerciseIndex).toEqual(0);
        expect(runner.startExercise).toHaveBeenCalledWith(runner.workoutPlan.exercises[runner.currentExerciseIndex]);
        expect(runner.currentExercise).toEqual(runner.workoutPlan.exercises[0]);
    }));

     xit("should start history tracking", inject([WorkoutRunnerComponent, WorkoutHistoryTracker], (runner: WorkoutRunnerComponent, tracker: WorkoutHistoryTracker) => {
         spyOn(tracker, 'startTracking');
         runner.ngOnInit();
         expect(tracker.startTracking).toHaveBeenCalled();
     }));

    xit('should increase current exercise duration with time', inject([WorkoutRunnerComponent],<any>fakeAsync((runner: WorkoutRunnerComponent) => {
        runner.ngOnInit();
        expect(runner.exerciseRunningDuration).toBe(0);
        tick(1000);
        expect(runner.exerciseRunningDuration).toBe(1);
        tick(1000);
        expect(runner.exerciseRunningDuration).toBe(2);
        tick(8000);
        expect(runner.exerciseRunningDuration).toBe(10);
        runner.ngOnDestroy();
    })));

    xit("should transition to next exercise on one exercise complete", inject([WorkoutRunnerComponent],<any>fakeAsync((runner: WorkoutRunnerComponent) => {
        runner.ngOnInit();
        let exerciseDuration = runner.workoutPlan.exercises[0].duration;
        tick((exerciseDuration + 1) * 1000);
        expect(runner.currentExercise.exercise.name).toBe('rest');
        expect(runner.currentExercise.duration).toBe(runner.workoutPlan.restBetweenExercise);
        runner.ngOnDestroy();
    })));

    xit("should not update workoutTimeRemaining for paused workout on interval lapse", inject([WorkoutRunnerComponent],<any>fakeAsync((runner: WorkoutRunnerComponent) => {
        runner.ngOnInit();
        expect(runner.workoutPaused).toBeFalsy();
        tick(1000);
        expect(runner.workoutTimeRemaining).toBe(runner.workoutPlan.totalWorkoutDuration() - 1);
        runner.pause();
        expect(runner.workoutPaused).toBe(true);
        tick(5000);
        expect(runner.workoutTimeRemaining).toBe(runner.workoutPlan.totalWorkoutDuration() - 1);
        runner.ngOnDestroy();
    })));
});