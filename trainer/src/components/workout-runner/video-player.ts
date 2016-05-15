import {Component, Input, Output, EventEmitter, Injector, provide} from '@angular/core';
import {Modal, ModalContext} from 'angular2-modal';
import {VideoDialog, VideoDialogContext} from './video-dialog';

@Component({
  selector: 'video-player',
  templateUrl: '/src/components/workout-runner/video-player.tpl.html'
})
export class VideoPlayer {
  @Input() videos: Array<string>;
  @Output() playbackStarted: EventEmitter<any> = new EventEmitter<any>();
  @Output() playbackEnded: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modal: Modal) { }

  playVideo(videoId: string) {
    this.playbackStarted.emit(null);
    var dialog = this.modal.open(VideoDialog, new VideoDialogContext(videoId));
    dialog
      .then((d) => d.result)
      .then(() => { this.playbackEnded.emit(null); }, (error) => { this.playbackEnded.emit(null); });
  };
}