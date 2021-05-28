import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: Observable<any>;
  constructor(private trainingService : TrainingService , private db : AngularFirestore) { }

  ngOnInit(): void {
  //  this.exercises = this.trainingService.getAvailableExercises();
    // this.db.collection('availableExercises').valueChanges()
    //   .subscribe(result => {
    //     console.log(result);
    //   });
    this.db
      .collection('availableExercises')
      .snapshotChanges().pipe(
        map((docArray :any) => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
           });
         })
      )
      .subscribe(result => {
        console.log(result);
        for (const res of result ){
          console.log(res.payload.doc.data());
         }
      });
  }
  onStart(form:NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
