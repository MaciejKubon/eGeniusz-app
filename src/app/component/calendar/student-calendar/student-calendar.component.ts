import { Component } from '@angular/core';
import {
  ClassesStudent,
  dataRange,
  studentClass,
} from '../../../interface/interface';
import { DatePipe } from '@angular/common';
import { ArrowBackComponent } from '../../button/arrow-back/arrow-back.component';
import { ClassesService } from '../../../service/http/classes.service';
import { StudentDayComponent } from './student-day/student-day.component';
import { LegendsComponent } from '../../legends/legends.component';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-student-calendar',
  standalone: true,
  imports: [SpinnerComponent, ArrowBackComponent, StudentDayComponent, LegendsComponent],
  templateUrl: './student-calendar.component.html',
  styleUrl: './student-calendar.component.scss',
})
export class StudentCalendarComponent {
  position = false;
  isLoadingResults: boolean = true;
  classes: studentClass[] = [];
  hourStart: number = 10;
  hourEnd: number = 23;
  hours: string[] = [];
  dateRangeBlocked = true;
  dataRangeDate = {
    start_date: new Date(),
    end_date: new Date(),
  };
  dataRange: dataRange = {
    start_date: '2024-11-09',
    end_date: '2024-11-15',
  };
  constructor(private studentClasses: ClassesService) {
    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      this.hours.push(i + ':00');
    }
    this.dataRangeDate.start_date = new Date();
    this.dataRangeDate.end_date.setDate(
      this.dataRangeDate.start_date.getDate() + 6
    );
    this.setRange();
  }
  ngOnInit() {
    this.refreshData();
  }
  refreshData() {
    this.isLoadingResults = true;
    this.classes=[];
    this.studentClasses
      .getStudentCalendar(this.dataRange)
      .subscribe((data: studentClass[]) => {
        data.forEach((e) => {
          let classe: ClassesStudent[] = [];
          e.classes.forEach((element) => {
            classe.push({
              classDate: element.classDate,
              classes: {
                lesson: element.classes.lesson,
                teacher: element.classes.teacher,
                confirmed: element.classes.confirmed,
                start_date: new Date(element.classes.start_date),
                end_date: new Date(element.classes.end_date),
              },
            });
          });
          this.classes.push({
            classDate: e.classDate,
            classes: classe,
          });
        });
        this.isLoadingResults = false;
        this.dateRangeBlocked = false;
        console.log(this.classes);
        
      });

  }
  setRange() {
    this.dataRange.start_date = new DatePipe('en-US')
      .transform(this.dataRangeDate.start_date, 'yyyy-MM-dd')
      ?.toString()!;
    this.dataRange.end_date = new DatePipe('en-US')
      .transform(this.dataRangeDate.end_date, 'yyyy-MM-dd')
      ?.toString()!;
  }
  changeRange(days: number) {
    if (!this.dateRangeBlocked) {
      this.dateRangeBlocked = true;
      this.dataRangeDate.start_date.setDate(
        this.dataRangeDate.start_date.getDate() + days
      );
      this.dataRangeDate.end_date.setDate(
        this.dataRangeDate.end_date.getDate() + days
      );
      this.setRange();
      this.refreshData();
    }
  }
  refDate(ref:boolean){ 
    this.refreshData();
  }
}
