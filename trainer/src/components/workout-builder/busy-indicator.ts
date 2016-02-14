import {Directive, ElementRef, Renderer, ViewContainerRef, HostBinding} from 'angular2/core';
import {NgControl} from 'angular2/common';

@Directive({
  selector: '[a2beBusyIndicator][ngControl],[a2beBusyIndicator][ngFormControl],[a2beBusyIndicator][ngModel]',
})
export class BusyIndicator {
  private _subscriptions: Array<any> = [];
  private get _validating(): boolean { return this._control.control != null && this._control.control.pending; };
  @HostBinding("style.borderWidth") get controlBorderWidth(): string { return this._validating ? "3px" : null; };
  @HostBinding("style.borderColor") get controlBorderColor(): string { return this._validating ? "gray" : null };

  constructor(private _control: NgControl) { }
}
