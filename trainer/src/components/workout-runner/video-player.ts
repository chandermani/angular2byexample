import {Component, Input, Output, EventEmitter, Injector, provide} from 'angular2/core';
import {Modal, ModalConfig} from 'angular2-modal';
import {VideoDialog} from './video-dialog';

@Component({
  selector: 'video-player',
  templateUrl: '/src/components/workout-runner/video-player.tpl.html',
  directives: [VideoDialog]
})
export class VideoPlayer {
  @Input() videos: Array<string>;
  @Output() playbackStarted: EventEmitter<any> = new EventEmitter<any>();
  @Output() playbackEnded: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modal: Modal) { }

  playVideo(videoId:any) {
    this.playbackStarted.emit(null);
    let resolvedBindings = Injector.resolve([provide('videoId', { useValue: videoId })]);
    var dialog = this._modal.open(<any>VideoDialog,
      resolvedBindings,
      new ModalConfig('lg', true, 27));
    dialog
      .then((d) => d.result)
      .then(() => { this.playbackEnded.emit(null); }, (error) => { this.playbackEnded.emit(null); });
  };
}