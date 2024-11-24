import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { teacherClasses, classesRange } from '../../../../../interface/interface';
import { ClassesService } from '../../../../../service/http/classes.service';
import { NoDataComponent } from '../../../../data/no-data/no-data.component';

@Component({
  selector: 'app-confirmed-classes',
  standalone: true,
  imports: [    MatProgressSpinnerModule,
    CommonModule,
    NoDataComponent],
  templateUrl: './confirmed-classes.component.html',
  styleUrl: './confirmed-classes.component.scss'
})
export class ConfirmedClassesComponent implements OnInit{
  isLoadingResults = true;
  classes: teacherClasses[] = [];
  classesDate:string='';
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
    this.setDate();
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData() {
    this.isLoadingResults = true;
    this.studentClasses.getTeacherClasses(this.range).subscribe((data) => {
      this.classes = data;
      this.classes.sort(
        (a, b) =>
          new Date(a.start_date).getDate() -
          new Date(b.start_date).getDate()
      );
      this.isLoadingResults = false;
      console.log(this.classes);
      
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
 
}
