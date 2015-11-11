import {Directive, Input, ElementRef} from 'angular2/angular2';

@Directive({
  selector: 'audio',
  exportAs: 'MyAudio'
})
export class MyAudio {
  private audioPlayer: HTMLAudioElement;
  constructor(element: ElementRef) {
    this.audioPlayer = element.nativeElement;
  }

  stop() {
    this.audioPlayer.pause();
  }
  start() {
    this.audioPlayer.play();
  }
  currentTime(): number {
    return this.audioPlayer.currentTime;
  }
  duration(): number {
    return this.audioPlayer.duration;
  }
  playbackComplete() {
    return this.duration() == this.currentTime();
  }

}
