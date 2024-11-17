import { Component } from '@angular/core';
import { TeacherDayTermsComponent } from '../teacher-day-terms/teacher-day-terms.component';
import { dataRange, terms, termsRequest } from '../../../interface/interface';
import { TeacherTermsService } from '../../../service/http/teacher-terms.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddTermComponent } from '../../form/add-term/add-term.component';
import { DatePipe } from '@angular/common';
import { ArrowBackComponent } from '../../button/arrow-back/arrow-back.component';

@Component({
  selector: 'app-teacher-calendar',
  standalone: true,
  imports: [
    TeacherDayTermsComponent,
    MatProgressSpinnerModule,
    AddTermComponent,
    ArrowBackComponent,
  ],
  templateUrl: './teacher-calendar.component.html',
  styleUrl: './teacher-calendar.component.scss',
})
export class TeacherCalendarComponent {
  position = false;
  isVisableTermForm = false;
  isLoadingResults: boolean = true;
  hourStart: number = 10;
  hourEnd: number = 23;
  hours: string[] = [];
  terms: terms[] = [];
  dateRangeBlocked = true;
  dataRangeDate = {
    start_date: new Date(),
    end_date: new Date(),
  };
  dataRange: dataRange = {
    start_date: '2024-11-09',
    end_date: '2024-11-15',
  };
  constructor(private httpTerms: TeacherTermsService) {
    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      this.hours.push(i + ':00');
    }
    this.dataRangeDate.start_date = new Date();
    this.dataRangeDate.end_date.setDate(
      this.dataRangeDate.start_date.getDate() + 7
    );
    this.setRange();
  }

  ngOnInit() {
    this.isLoadingResults = true;
    this.httpTerms
      .getTechersTerms(this.dataRange)
      .subscribe((data: termsRequest[]) => {
        data.forEach((e) => {
          let term: {
            id: number;
            startTime: Date;
            endTime: Date;
            status: boolean;
            diffTime: number | null;
            posTop: number | null;
          }[] = [];
          e.terms.forEach((element) => {
            term.push({
              startTime: new Date(element.start_date),
              endTime: new Date(element.end_date),
              id: element.id,
              status: false,
              diffTime: null,
              posTop: null,
            });
          });
          this.terms.push({
            dayTime: new Date(e.dayTime),
            terms: term,
          });
        });
        this.isLoadingResults = false;
        this.dateRangeBlocked = false;
      });
  }
  times: string = '';
  setNewTerm(times: string) {
    if (times.split(' ')[0] == 'id:') this.refreshData();
    else {
      this.times = times;
      this.isVisableTermForm = true;
    }
  }
  refreshData() {
    this.isLoadingResults = true;
    this.terms = [];
    this.httpTerms
      .getTechersTerms(this.dataRange)
      .subscribe((data: termsRequest[]) => {
        data.forEach((e) => {
          let term: {
            id: number;
            startTime: Date;
            endTime: Date;
            status: boolean;
            diffTime: number | null;
            posTop: number | null;
          }[] = [];
          e.terms.forEach((element) => {
            term.push({
              startTime: new Date(element.start_date),
              endTime: new Date(element.end_date),
              id: element.id,
              status: false,
              diffTime: null,
              posTop: null,
            });
          });
          this.terms.push({
            dayTime: new Date(e.dayTime),
            terms: term,
          });
        });
        this.isLoadingResults = false;
        this.dateRangeBlocked = false;
      });
  }
  addNewTerm(newTerm: boolean) {
    if (!newTerm) {
      this.isVisableTermForm = false;
    } else {
      this.isVisableTermForm = false;
      this.refreshData();
    }
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
}
