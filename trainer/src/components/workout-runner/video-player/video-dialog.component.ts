import {Component, Inject} from '@angular/core';
import {DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap'

export class VideoDialogContext extends BSModalContext {
  constructor(public videoId: string) {
    super();
  }
}

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
export class VideoDialogComponent implements ModalComponent<VideoDialogContext> {
  context: VideoDialogContext;
  videoId: string;
  constructor(public dialog: DialogRef<VideoDialogContext>) {
    this.videoId = dialog.context.videoId;
  }

  ok() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }
}
