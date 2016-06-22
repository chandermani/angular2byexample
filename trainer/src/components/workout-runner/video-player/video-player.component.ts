import {Component, Input, Injector, provide} from '@angular/core';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {VideoDialogComponent, VideoDialogContext} from './video-dialog.component';

@Component({
  selector: 'video-player',
  templateUrl: '/src/components/workout-runner/video-player/video-player.html'
})
export class VideoPlayerComponent {
  @Input() videos: Array<string>;

  constructor(private modal: Modal) { }

  playVideo(videoId: string) {
    this.modal.open(VideoDialogComponent, new VideoDialogContext(videoId));
  };
}