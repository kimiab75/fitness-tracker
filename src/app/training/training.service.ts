import { Exercise } from './exercise.model';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class TrainingService{
    availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    private runningExercise: Exercise;

    exerciseChanged = new Subject<Exercise>();
    private exercises: Exercise[]=[];

    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
  
        this.runningExercise =
            this.availableExercises.find(
                ex => ex.id == selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }
    completeExercise() {
        this.exercises.push({
            ...this.runningExercise,
            date : new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    cancleExercise(progress : number) {
        this.exercises.push({
            ...this.runningExercise,
            duration: this.runningExercise.duration*(progress / 100),
            calories :  this.runningExercise.duration*(progress / 100),
            date : new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }
    getRunningExercise() {
        return { ...this.runningExercise };
    }
    getCompletesdOrCanceledExercises() {
        return this.exercises.slice();
    }
}
