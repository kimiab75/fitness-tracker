import { TrainingService } from './../training.service';
import { Exercise } from './../exercise.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit , AfterViewInit {
  displayedColumns:string[] = [
    'date',
    'name', 
    'duration',
    'calories',
    'state'
  ];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort , {static: true}) sort: MatSort;
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  constructor(private trainingService : TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data =
      this.trainingService.getCompletesdOrCanceledExercises();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filterValue : string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
