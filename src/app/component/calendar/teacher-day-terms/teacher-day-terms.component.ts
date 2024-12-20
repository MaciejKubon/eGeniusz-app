import { Component, EventEmitter, Input, Output } from '@angular/core';
import { terms, term } from '../../../interface/interface';
import { AddTermComponent } from '../../form/add-term/add-term.component';
import { ConfirmDeleteComponent } from '../detail/confirm-delete/confirm-delete.component';
import { TeacherConfirmedComponent } from '../detail/teacher-confirmed/teacher-confirmed.component';
import { TeacherNoConfirmedComponent } from '../detail/teacher-no-confirmed/teacher-no-confirmed.component';

@Component({
  selector: 'app-teacher-day-terms',
  standalone: true,
  imports: [
    ConfirmDeleteComponent,
    AddTermComponent,
    TeacherConfirmedComponent,
    TeacherNoConfirmedComponent
  ],
  templateUrl: './teacher-day-terms.component.html',
  styleUrl: './teacher-day-terms.component.scss',
})
export class TeacherDayTermsComponent {
  @Output() refleshData = new EventEmitter<boolean>();
  @Input() terms: terms = {
    dayTime: new Date('2024-11-09 10:00:00'),
    terms: [
      {
        id: 0,
        startTime: new Date('2024-11-09 11:00:00'),
        endTime: new Date('2024-11-09 12:00:00'),
        status: true,
        diffTime: null,
        posTop: null,
        classes: null,
      },
    ],
  };
  isVisableTermDelete = false;
  isVisableTermForm = false;
  isVisableClassesConfirmed = false;
  isVisableNoClassesConfirmed = false;

  term: term = {
    id: 0,
    startTime: new Date('2024-11-09 11:00:00'),
    endTime: new Date('2024-11-09 12:00:00'),
    status: true,
    diffTime: null,
    posTop: null,
    classes: null,
  };
  dayNameEmit: string = '';
  dayName: string = '';
  dayTime: Date = new Date(this.dayName + ' 10:00:00');
  hourStart: number = 10;
  hourEnd: number = 23;
  times: string = '';
  classesID:number = 0;
  hours: {
    hh: string;
    mm: string[];
  }[] = [];
  constructor() {
    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      let minutes: string[] = ['00', '15', '30', '45'];
      this.hours.push({ hh: i.toString(), mm: minutes });
    }
  }

  ngOnInit() {
    this.setName();
    this.dayTime = this.terms.dayTime;
    this.calculateTerms();
  }
  setName() {
    let day: string = '';
    let month: string = '';
    let year: string = this.terms.dayTime.getFullYear().toString();
    if (this.terms.dayTime.getDate() < 10)
      day = '0' + this.terms.dayTime.getDate().toString();
    else day = this.terms.dayTime.getDate().toString();
    if (this.terms.dayTime.getMonth() + 1 < 10)
      month = '0' + (this.terms.dayTime.getMonth() + 1).toString();
    else month = (this.terms.dayTime.getMonth() + 1).toString();
    this.dayName = day + '-' + month + '-' + year;
    this.dayNameEmit = year + '-' + month + '-' + day;
  }
  calculateTerms() {
    if (this.terms?.terms != null) {
      this.terms.terms.forEach((e) => {
        e.diffTime = Math.ceil(
          Math.abs(e.endTime.getTime() - e.startTime.getTime()) / (1000 * 60)
        );
        e.posTop =
          2 +
          Math.ceil(
            Math.abs(e.startTime.getTime() - this.dayTime.getTime()) /
              (1000 * 60)
          ) -
          540;
      });
    }
  }
  selectTerm(times: string) {
    this.times = this.dayNameEmit + ' ' + times;
    this.isVisableTermForm = true;
  }
  openDetail(term: term) {
    this.term = term;
    this.isVisableTermDelete = true;
  }

  openConfirmedDetail(id: number) {
    this.classesID = id;
    this.isVisableClassesConfirmed = true;
  }
  openNoConfirmedDetail(id: number) {
    this.classesID = id;
    this.isVisableNoClassesConfirmed = true;
  }
  closeModal(ref:boolean){
    if(ref){
      this.refleshData.emit(true);
      this.isVisableClassesConfirmed = false;
      this.isVisableNoClassesConfirmed = false;
      this.isVisableTermDelete = false;
      this.isVisableTermForm = false;
    }else{
      this.isVisableNoClassesConfirmed = false;
      this.isVisableClassesConfirmed = false;
      this.isVisableTermDelete = false;
      this.isVisableTermForm = false;
    }
  }
}
