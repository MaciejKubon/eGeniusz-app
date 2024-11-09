import { Component, Input, input } from '@angular/core';
import { terms } from '../../../interface/interface';

@Component({
  selector: 'app-teacher-day-terms',
  standalone: true,
  imports: [],
  templateUrl: './teacher-day-terms.component.html',
  styleUrl: './teacher-day-terms.component.scss',
})
export class TeacherDayTermsComponent {
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
      },
    ],
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
    this.dayName =
      this.terms.dayTime.getDate().toString() +
      '-' +
      this.terms.dayTime.getMonth().toString() +
      '-' +
      this.terms.dayTime.getFullYear().toString();
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
          );

      });
    }
  }
  selectTerm(times: string) {
    console.log(times);
  }
}
