import { Component, Directive, NO_ERRORS_SCHEMA, DebugElement} from '@angular/core';
import { TestBed, fakeAsync, async, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, NG_VALIDATORS, AbstractControl, NgForm, FormControl } from '@angular/forms';

import { RemoteValidatorDirective } from "./remote-validator.directive";

@Component({
    template: `
    <form>
       <input type="text" name="workoutName" id="workout-name"  [(ngModel)]="workoutName" 
 a2beBusyIndicator a2beRemoteValidator="workoutname" [validateFunction]="validateWorkoutName">
    </form>
  `
})
export class TestComponent {
    workoutName: string;

    constructor() {
        this.workoutName = '7MinWorkout';
    }
    validateWorkoutName = (name: string): Promise<boolean> => {
        return Promise.resolve(false);
    }
}

describe('RemoteValidator', () => {
    let fixture: any;
    let comp: any;
    let debug: any;
    let input: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ TestComponent, RemoteValidatorDirective ]
        });
        fixture = TestBed.createComponent(TestComponent);
        comp = fixture.componentInstance;
        debug = fixture.debugElement;
        input = debug.query(By.css('[name=workoutName]'));
    }));

    it("should load the directive without error", fakeAsync(() =>  {
        expect(input.attributes.a2beRemoteValidator).toBe('workoutname', 'remote validator directive should be loaded.')
    }));

    it('should create error if remote validation fails', fakeAsync(() => {
        spyOn(comp, 'validateWorkoutName').and.callThrough();
        fixture.detectChanges();
        input.nativeElement.value = '6MinWorkout';
        tick();

        let form: NgForm = debug.children[0].injector.get(NgForm);
        let control = form.control.get('workoutName');

        expect(comp.validateWorkoutName).toHaveBeenCalled();
        expect(control.hasError('workoutname')).toBe(true);
        expect(control.valid).toBe(false);
        expect(form.valid).toEqual(false);
        expect(form.control.valid).toEqual(false);
        expect(form.control.hasError('workoutname', ['workoutName'])).toEqual(true);
    }));

    it('should not create error if remote validation succeeds', fakeAsync(() => {
        spyOn(comp, 'validateWorkoutName').and.returnValue(Promise.resolve(true));
        fixture.detectChanges();
        input.nativeElement.value = '6MinWorkout';
        tick();

        let form: NgForm = debug.children[0].injector.get(NgForm);
        let control = form.control.get('workoutName');

        expect(comp.validateWorkoutName).toHaveBeenCalled();
        expect(control.hasError('workoutname')).toBe(false);
        expect(control.valid).toBe(true);
        expect(form.control.valid).toEqual(true);
        expect(form.valid).toEqual(true);
        expect(form.control.hasError('workoutname', ['workoutName'])).toEqual(false);
    }));
});