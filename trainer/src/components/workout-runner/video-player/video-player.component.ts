import {Component, Input, Output, EventEmitter, Injector, provide} from '@angular/core';
import {Modal} from 'angular2-modal/plugins/bootstrap';
import {VideoDialogComponent, VideoDialogContext} from './video-dialog.component';

@Component({
  selector: 'video-player',
  templateUrl: '/src/components/workout-runner/video-player/video-player.html'
})
export class VideoPlayerComponent {
  @Input() videos: Array<string>;
  @Output() playbackStarted: EventEmitter<any> = new EventEmitter<any>();
  @Output() playbackEnded: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modal: Modal) { }

  playVideo(videoId: string) {
    this.playbackStarted.emit(null);
    var dialog = this.modal.open(VideoDialogComponent, new VideoDialogContext(videoId));
    dialog
      .then((d) => d.result)
      .then(() => { this.playbackEnded.emit(null); }, (error) => { this.playbackEnded.emit(null); });
  };
}