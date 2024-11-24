import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  classes,
  classesRange,
  studentClasses,
} from '../../../../../interface/interface';
import { ClassesService } from '../../../../../service/http/classes.service';
import { NoDataComponent } from '../../../../data/no-data/no-data.component';
import { DeleteButtonComponent } from '../../../../button/delete-button/delete-button.component';

@Component({
  selector: 'app-no-confirmed-classes',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    NoDataComponent,
    DeleteButtonComponent,
  ],
  templateUrl: './no-confirmed-classes.component.html',
  styleUrl: './no-confirmed-classes.component.scss',
})
export class NoConfirmedClassesComponent implements OnInit {
  isLoadingResults = true;
  classes: classes[] = [];
  dataRangeDate = {
    start_date: new Date(),
    end_date: new Date(),
  };
  range: classesRange = {
    start_date: '',
    end_date: '',
    confirmed: false,
  };

  constructor(private studentClasses: ClassesService) {
    this.setDate();
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData() {
    this.isLoadingResults = true;
    this.studentClasses.getStudnetClasses(this.range).subscribe((data) => {
      this.classes = data;
      this.classes.sort(
        (a, b) =>
          new Date(a.term.start_date).getDate() -
          new Date(b.term.end_date).getDate()
      );
      this.isLoadingResults = false;
    });
  }
  addDaysToDate(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }
  setDate() {
    this.dataRangeDate.start_date = new Date();
    this.dataRangeDate.end_date = this.addDaysToDate(new Date(), 7);

    this.range.start_date = new DatePipe('en-US')
      .transform(this.dataRangeDate.start_date, 'yyyy-MM-dd')
      ?.toString()!;
    this.range.end_date = new DatePipe('en-US')
      .transform(this.dataRangeDate.end_date, 'yyyy-MM-dd')
      ?.toString()!;
  }
  deleteClasses(id: number) {
    this.studentClasses.deleteClasses(id).subscribe((data) => {
      console.log(data);
    });
    this.refreshData();
  }
}
