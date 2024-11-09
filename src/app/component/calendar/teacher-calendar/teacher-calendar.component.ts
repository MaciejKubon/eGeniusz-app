import { Component } from '@angular/core';
import { TeacherDayTermsComponent } from '../teacher-day-terms/teacher-day-terms.component';
import { terms } from '../../../interface/interface';

@Component({
  selector: 'app-teacher-calendar',
  standalone: true,
  imports: [TeacherDayTermsComponent],
  templateUrl: './teacher-calendar.component.html',
  styleUrl: './teacher-calendar.component.scss',
})
export class TeacherCalendarComponent {
  hourStart: number = 10;
  hourEnd: number = 23;
  hours: string[] = [];

  terms: terms[] = [
    {
      dayTime: new Date('2024-11-09 10:00:00'),
      terms: [
        {
          id: 1,
          startTime: new Date('2024-11-09 11:00:00'),
          endTime: new Date('2024-11-09 12:00:00'),
          status: true,
          diffTime: null,
          posTop: null,
        },
        {
          id: 2,
          startTime: new Date('2024-11-09 13:30:00'),
          endTime: new Date('2024-11-09 15:15:00'),
          status: false,
          diffTime: null,
          posTop: null,
        },
      ],
    },
    {
      dayTime: new Date('2024-11-10 10:00:00'),
      terms: [
        {
          id: 1,
          startTime: new Date('2024-11-10 12:00:00'),
          endTime: new Date('2024-11-10 14:00:00'),
          status: true,
          diffTime: null,
          posTop: null,
        },
        {
          id: 1,
          startTime: new Date('2024-11-10 17:30:00'),
          endTime: new Date('2024-11-10 18:30:00'),
          status: false,
          diffTime: null,
          posTop: null,
        },
      ],
    },
    {
      dayTime: new Date('2024-11-11 10:00:00'),
      terms: [
        {
          id: 1,
          startTime: new Date('2024-11-11 10:00:00'),
          endTime: new Date('2024-11-11 10:45:00'),
          status: true,
          diffTime: null,
          posTop: null,
        },
        {
          id: 1,
          startTime: new Date('2024-11-11 11:45:00'),
          endTime: new Date('2024-11-11 12:00:00'),
          status: false,
          diffTime: null,
          posTop: null,
        },
      ],
    },
    {
      dayTime: new Date('2024-11-12 09:00:00'),
      terms: [],
    },
    {
      dayTime: new Date('2024-11-13 09:00:00'),
      terms: [],
    },
    {
      dayTime: new Date('2024-11-14 09:00:00'),
      terms: [],
    },
    {
      dayTime: new Date('2024-11-15 09:00:00'),
      terms: [],
    },
  ];

  constructor() {
    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      this.hours.push(i + ':00');
    }
  }
}
