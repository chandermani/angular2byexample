import {Component, Input} from 'angular2/core';

@Component({
  selector: 'video-player',
  templateUrl: '/src/components/workout-runner/video-player.tpl.html'
})
export class VideoPlayer {
  @Input() videos: Array<string>;
}
