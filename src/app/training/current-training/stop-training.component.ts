import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from "@angular/core";

@Component({
    selector: 'app-stop-training',
    template: `<h1 mat-dialog-title>are you sure?</h1>
    <mat-dialog-content>
        <p>you already got {{data.progress}}%</p>
    </mat-dialog-content>
   <mat-dialog-actions>
       <button mat-button [mat-dialog-close] ="true">yes</button>
       <button mat-button [mat-dialog-close] ="false">no</button>
   </mat-dialog-actions>
    `
})
export class StopTrainingComponent{
constructor( @Inject(MAT_DIALOG_DATA) private data: any){}
}