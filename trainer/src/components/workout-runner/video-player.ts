import {Component, Input, Injector, provide} from '@angular/core';
import {Modal, ModalContext} from 'angular2-modal';
import {VideoDialog, VideoDialogContext} from './video-dialog';

@Component({
  selector: 'video-player',
  templateUrl: '/src/components/workout-runner/video-player.tpl.html'
})
export class VideoPlayer {
  @Input() videos: Array<string>;

  constructor(private modal: Modal) { }

  playVideo(videoId: string) {
    this.modal.open(VideoDialog, new VideoDialogContext(videoId));
  };
}