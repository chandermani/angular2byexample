import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { WorkoutAudioComponent } from '../workout-audio/workout-audio.component';
import { WorkoutRunnerComponent } from '../workout-runner.component';

@Component({
  selector: 'workout-container',
  templateUrl: '/src/components/workout-runner/workout-container/workout-container.html'
})
export class WorkoutContainerCompnent implements OnInit, OnDestroy {
    private workoutName: string;
    private sub: any;

    constructor(private route:ActivatedRoute,
                private router:Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.workoutName = params['id'];
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
