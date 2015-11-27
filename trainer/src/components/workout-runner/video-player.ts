import {Component, Input} from 'angular2/angular2';

@Component({
  selector: 'video-player',
  templateUrl: '/src/components/workout-runner/video-player.tpl.html'
})
export class VideoPlayer {
  @Input() videos: Array<string>;
}
