import {Component, Inject} from 'angular2/core';
import {ModalDialogInstance, Modal, ModalConfig} from 'angular2-modal';
// Custom dialog class for showing view in a popup.
@Component({
  selector: 'video-dialog',
  template: `<div class="modal-header">
                <h3 class="modal-title">Workout Video</h3>
            </div>
            <div class="modal-body">
                <iframe width="100%" height="480" [src]="'//www.youtube.com/embed/' + videoId" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" (click)="ok()">OK</button>
            </div>`,
})
export class VideoDialog {
  constructor( @Inject('videoId') private videoId: string, private _dialog: ModalDialogInstance) { }

  ok() {
    this._dialog.close();
  }
}
