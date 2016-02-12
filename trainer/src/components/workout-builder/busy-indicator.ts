import {Directive, ElementRef, Renderer, ViewContainerRef, HostBinding} from 'angular2/core';
import {NgControl} from 'angular2/common';

@Directive({
  selector: '[a2beBusyIndicator][ngControl],[a2beBusyIndicator][ngFormControl],[a2beBusyIndicator][ngModel]',
})
export class BusyIndicator {
  private _subscriptions: Array<any> = [];
  @HostBinding("readonly") validating: boolean;
  constructor(private _element: ElementRef, private _renderer: Renderer, private _control: NgControl) { }

  ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  ngAfterContentChecked() {
    if (this._control.control != null && this._subscriptions.length == 0) {
      this._subscriptions.push(this._control.control
        .statusChanges
        .debounceTime(500)
        .subscribe((status: any) => {
        if (this._control.control.pending) {
          this._renderer.setElementStyle(this._element, "border-width", "2");
          this._renderer.setElementStyle(this._element, "border-color", "gray");
          this.validating = true;
        }
        else {
          this._renderer.setElementStyle(this._element, "border-width", null);
          this._renderer.setElementStyle(this._element, "border-color", null);
          this.validating = false;
        }
      }));
    }
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit');
    // The control property for ngControl is not available in this event to attach event listners.
  }
}
