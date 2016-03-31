import {describe, it, iit, xit, expect, inject, beforeEach, beforeEachProviders, injectAsync, fakeAsync, tick, TestComponentBuilder, MockApplicationRef} from 'angular2/testing';
import {APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT, ROUTER_PROVIDERS, RouteConfig, RouteRegistry} from 'angular2/router';
import {provide, ApplicationRef} from 'angular2/core';
import {WorkoutRunner} from "./workout-runner";
import {WorkoutHistoryTracker} from '../../services/workout-history-tracker';
import {Finish} from "./finish";

class MockWorkoutHistoryTracker {
    startTracking() {}
    endTracking() {}
    exerciseComplete() {}
    tracking: any;
}

@RouteConfig([
    { path: '', name: 'Finish', component: Finish },
])
class MockPrimaryComponent {
}

describe('Workout Runner', () =>{
    let component:any;
    let router:any;

    beforeEachProviders(() =>[
        WorkoutRunner,
        provide(WorkoutHistoryTracker, {useClass: MockWorkoutHistoryTracker}),
        ROUTER_PROVIDERS,
        RouteRegistry,
        provide(ApplicationRef, {useClass: MockApplicationRef}),
        provide(APP_BASE_HREF, {useValue: '/'}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: MockPrimaryComponent})
    ]);

    it('should load the component', inject([WorkoutRunner], (runner: WorkoutRunner) => {
        expect(runner).toBeDefined();
    }));

    it('should start the workout', inject([WorkoutRunner], (runner: WorkoutRunner) => {
        runner.workoutStarted.subscribe((w: any) => {
            expect(w).toEqual(runner.workoutPlan);
        })
        runner.ngOnInit();
        expect(runner.workoutPlan).toEqual(runner.buildWorkout());
        expect(runner.workoutTimeRemaining).toEqual(runner.workoutPlan.totalWorkoutDuration());
        expect(runner.workoutPaused).toBeFalsy();
    }));

    it('should start the first exercise', inject([WorkoutRunner], (runner: WorkoutRunner) => {
        spyOn(runner, 'startExercise').and.callThrough();
        runner.ngOnInit();
        expect(runner.currentExerciseIndex).toEqual(0);
        expect(runner.startExercise).toHaveBeenCalledWith(runner.workoutPlan.exercises[runner.currentExerciseIndex]);
        expect(runner.currentExercise).toEqual(runner.workoutPlan.exercises[0]);
    }));

     it("should start history tracking", inject([WorkoutRunner, WorkoutHistoryTracker], (runner: WorkoutRunner, tracker: WorkoutHistoryTracker) => {
         spyOn(tracker, 'startTracking');
         runner.ngOnInit();
         expect(tracker.startTracking).toHaveBeenCalled();
     }));

    it('should increase current exercise duration with time', inject([WorkoutRunner],<any>fakeAsync((runner: WorkoutRunner) => {
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

    it("should transition to next exercise on one exercise complete", inject([WorkoutRunner],<any>fakeAsync((runner: WorkoutRunner) => {
        runner.ngOnInit();
        let exerciseDuration = runner.workoutPlan.exercises[0].duration;
        tick((exerciseDuration + 1) * 1000);
        expect(runner.currentExercise.exercise.name).toBe('rest');
        expect(runner.currentExercise.duration).toBe(runner.workoutPlan.restBetweenExercise);
        runner.ngOnDestroy();
    })));

    it("should not update workoutTimeRemaining for paused workout on interval lapse", inject([WorkoutRunner],<any>fakeAsync((runner: WorkoutRunner) => {
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