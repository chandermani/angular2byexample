import {Component, Input, Injector} from '@angular/core';
import {SafeResourceUrl} from '@angular/platform-browser';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { overlayConfigFactory } from 'angular2-modal'
import {VideoDialogComponent, VideoDialogContext} from './video-dialog.component';

@Component({
  selector: 'video-player',
  templateUrl: '/src/components/workout-runner/video-player/video-player.html'
})
export class VideoPlayerComponent {
  @Input() videos: Array<string>;

  constructor(private modal: Modal) { }

  playVideo(videoId: string) {
    this.modal.open(VideoDialogComponent, overlayConfigFactory(new VideoDialogContext(videoId)));
  };
}