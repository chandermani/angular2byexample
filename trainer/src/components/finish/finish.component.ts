import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'finish',
  templateUrl: '/src/components/finish/finish.html',
})
export class FinishComponent implements OnInit, OnDestroy {
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