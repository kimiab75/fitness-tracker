import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit , OnDestroy {
  onGoingTraining = false;
  exerciseSub: Subscription;
  constructor(private traningService:TrainingService) { }

  ngOnInit(): void {
    this.exerciseSub = this.traningService.exerciseChanged
      .subscribe(exercise => {
        if (exercise) {
          this.onGoingTraining = true; 
        }
        else {
          this.onGoingTraining = false;
        }
      });
  }
  ngOnDestroy() {
    this.exerciseSub.unsubscribe();
}
}
