import { Component, EventEmitter, Input, Output } from '@angular/core';
import { term, terms } from '../../../interface/interface';
import { SetClassesComponent } from '../set-classes/set-classes.component';

@Component({
  selector: 'app-teacher-detail-day-term',
  standalone: true,
  imports: [SetClassesComponent],
  templateUrl: './teacher-detail-day-term.component.html',
  styleUrl: './teacher-detail-day-term.component.scss',
})
export class TeacherDetailDayTermComponent {
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
  isVisableTermDetail: boolean = false;
  term: term = {
    id: 0,
    startTime: new Date('2024-11-09 11:00:00'),
    endTime: new Date('2024-11-09 12:00:00'),
    status: true,
    diffTime: null,
    posTop: null,
    classes: null,
  };
  dayName: string = '';
  dayTime: Date = new Date(this.dayName + ' 10:00:00');
  hourStart: number = 10;
  hourEnd: number = 23;
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
    this.dayTime = this.terms.dayTime;
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
  openDetail(term: term) {
    this.term = term;
    console.log(term);
    this.isVisableTermDetail = true;
  }
  setNewClasses(ref: boolean) {
    if (ref) {
      this.isVisableTermDetail = false;
      this.refleshData.emit(true);

    } else {
      this.isVisableTermDetail = false;
    }
  }
}
