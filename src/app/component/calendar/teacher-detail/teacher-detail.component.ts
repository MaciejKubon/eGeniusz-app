import { Component, Input, OnInit } from '@angular/core';
import { TeacherTermsService } from '../../../service/http/teacher-terms.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { dataRange, studentClasses, term, terms, termsAndClasses, termsClass, termsRequest } from '../../../interface/interface';
import { ActivatedRoute } from '@angular/router';
import { TeacherDetailDayTermComponent } from '../teacher-detail-day-term/teacher-detail-day-term.component';
import { DatePipe } from '@angular/common';
import { ArrowBackComponent } from '../../button/arrow-back/arrow-back.component';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [MatProgressSpinnerModule, ArrowBackComponent,TeacherDetailDayTermComponent],
  templateUrl: './teacher-detail.component.html',
  styleUrl: './teacher-detail.component.scss',
})
export class TeacherDetailComponent implements OnInit {
  @Input() teacherID: string|null = null;
  position = false;
  isLoadingResults: boolean = true;
  hourStart: number = 10;
  hourEnd: number = 23;
  hours: string[] = [];
  terms: termsAndClasses[] = [];
  dateRangeBlocked = true;
  dataRangeDate = {
    start_date: new Date(),
    end_date: new Date(),
  };
  dataRange: dataRange = {
    start_date: '2024-11-09',
    end_date: '2024-11-15',
  };
  constructor(
    private httpTerms: TeacherTermsService,
  ) {
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
    this.httpTerms
      .getTeachersDetailTerms(this.dataRange, this.teacherID)
      .subscribe( (data: termsClass[]) => {
        data.forEach((e) => {
          let term: term[] = [];
          let classes: studentClasses[] =[];
          e.terms.forEach((element) => {
            term.push({
              startTime: new Date(element.start_date),
              endTime: new Date(element.end_date),
              id: element.id,
              status: false,
              diffTime: null,
              posTop: null,
              classes:element.classes,
            });
          });
          e.classes.forEach((element)=>{
            classes.push({
              id: element.id,
              lesson:element.lesson,
              term:{
                id:element.term.id,
                teacher_id:element.term.teacher_id,
                start_date:new Date(element.term.start_date),
                end_date: new Date(element.term.end_date),
                diffTime:null,
                posTop:null,
              },
              confirmed:element.confirmed
            })
          })
          this.terms.push({
            dayTime: new Date(e.dayTime),
            terms: term,
            classes:classes
          });
        });
        this.isLoadingResults = false;
        this.dateRangeBlocked = false;

      });
  }
  refreshData() {
    this.isLoadingResults = true;
    this.terms = [];
    this.httpTerms
      .getTeachersDetailTerms(this.dataRange, this.teacherID)
      .subscribe((data: termsClass[]) => {
        data.forEach((e) => {
          let term: term[] = [];
          let classes: studentClasses[] =[];

          e.terms.forEach((element) => {
            term.push({
              startTime: new Date(element.start_date),
              endTime: new Date(element.end_date),
              id: element.id,
              status: false,
              diffTime: null,
              posTop: null,
              classes:  element.classes,
            });
          });
          e.classes.forEach((element)=>{
            classes.push({
              id: element.id,
              lesson:element.lesson,
              term:{
                id:element.term.id,
                teacher_id:element.term.teacher_id,
                start_date:new Date(element.term.start_date),
                end_date: new Date(element.term.end_date),
                diffTime:null,
                posTop:null,
              },
              confirmed:element.confirmed
            })
          })
          this.terms.push({
            dayTime: new Date(e.dayTime),
            terms: term,
            classes:classes
          });
        });
        this.isLoadingResults = false;
        this.dateRangeBlocked = false;
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
