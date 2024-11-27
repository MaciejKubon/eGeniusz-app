import { Component, EventEmitter, Input, Output } from '@angular/core';
import { studentClass } from '../../../../interface/interface';

@Component({
  selector: 'app-student-day',
  standalone: true,
  imports: [],
  templateUrl: './student-day.component.html',
  styleUrl: './student-day.component.scss',
})
export class StudentDayComponent {
  @Output() refleshData = new EventEmitter<boolean>();
  @Input() classes: studentClass = {
    classDate: '',
    classes: [],
  };
  dayNameEmit: string = '';
  dayName: string = '';
  hourStart: number = 10;
  hourEnd: number = 23;
  dayTime: Date = new Date(this.dayName + ' 10:00:00');

  times: string = '';
  classesID: number = 0;
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
  }

  setName() {
    let date: string[] = this.classes.classDate.split('-');
    let day: string = date[2];
    let month: string = date[1];
    let year: string = date[0];
    this.dayName = day + '-' + month + '-' + year;
    this.dayNameEmit = year + '-' + month + '-' + day;
    this.dayTime = new Date(this.dayName + ' 10:00:00');      
  }

  calculateTerms() {
    if (this.classes.classes != null) {
      this.classes.classes.forEach((e) => {
        
        
        e.classes.diffTime = Math.ceil(
          Math.abs(
            e.classes.end_date.getTime() - e.classes.start_date.getTime()
          ) /
            (1000 * 60)
        );
        e.classes.posTop =
          2 +
          Math.ceil(
            Math.abs(e.classes.start_date.getTime() - this.dayTime.getTime()) /
              (1000 * 60)
          ) -
          540;
      });

      
    }
  }
}
