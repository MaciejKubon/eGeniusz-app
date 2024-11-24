import { Component, OnInit } from '@angular/core';
import { classes, classesRange } from '../../../../../interface/interface';
import { ClassesService } from '../../../../../service/http/classes.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-upcoming-classes',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './upcoming-classes.component.html',
  styleUrl: './upcoming-classes.component.scss',
})
export class UpcomingClassesComponent implements OnInit {
  isLoadingResults = true;
  classes: classes[] = [];
  dataRangeDate = {
    start_date: new Date(),
    end_date: new Date(),
  };
  range: classesRange = {
    start_date: '',
    end_date: '',
    confirmed: true,
  };

  constructor(private studentClasses: ClassesService) {
    this.setDate()
  }
  ngOnInit() {
    this.studentClasses.getStudnetClasses(this.range).subscribe((data) => {
      this.classes = data;
      this.classes.sort(
        (a, b) =>
          new Date(a.term.start_date).getDate() -
          new Date(b.term.end_date).getDate()
      );

      console.log(this.range);
      

      this.isLoadingResults = false;
    });
  }
  addDaysToDate(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}
  setDate(){
    this.dataRangeDate.start_date = new Date();
    this.dataRangeDate.end_date = this.addDaysToDate(new Date(),7);

    this.range.start_date = new DatePipe('en-US')
    .transform(this.dataRangeDate.start_date, 'yyyy-MM-dd')
    ?.toString()!;
    this.range.end_date = new DatePipe('en-US')
    .transform(this.dataRangeDate.end_date, 'yyyy-MM-dd')
    ?.toString()!;
  }
}
