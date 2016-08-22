import {Component, Input, HostListener} from '@angular/core';

@Component({
  selector: 'ajax-button',
  template: `<button [attr.disabled]="busy" class="btn btn-primary">
                  <span [hidden]="!busy">
                      <ng-content select="[data-animator]"></ng-content>
                  </span>
                  <ng-content select="[data-content]"></ng-content>
              </button>`
})
export class AjaxButtonComponent {
  busy: boolean = null;
  @Input() execute: any;
  @Input() parameter: any;

  @HostListener('click', ['$event'])
  onClick(event: any) {
    let result: any = this.execute(this.parameter);
    if (result instanceof Promise) {
      this.busy = true;
      result.then(
        () => {
          this.busy = null;
        }, (error: any) => {
          this.busy = null;
        });
    }
  }
}
