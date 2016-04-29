import {Component, Input, Injector, provide} from 'angular2/core';
import {Modal, ModalConfig} from 'angular2-modal';
import {VideoDialog} from './video-dialog';

@Component({
  selector: 'video-player',
  templateUrl: '/src/components/workout-runner/video-player.tpl.html'
})
export class VideoPlayer {
  @Input() videos: Array<string>;

  constructor(private _modal: Modal) { }

  playVideo(videoId:string) {
    let resolvedBindings = Injector.resolve([provide('videoId', { useValue: videoId })]);
    this._modal.open(<any>VideoDialog,
      resolvedBindings,
      new ModalConfig('lg', true, 27));
  };
}