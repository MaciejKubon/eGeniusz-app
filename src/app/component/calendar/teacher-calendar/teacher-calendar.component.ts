import { Component } from '@angular/core';
import { TeacherDayTermsComponent } from '../teacher-day-terms/teacher-day-terms.component';
import { dataRange, terms, termsRequest } from '../../../interface/interface';
import { TeacherTermsService } from '../../../service/http/teacher-terms.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-teacher-calendar',
  standalone: true,
  imports: [TeacherDayTermsComponent, MatProgressSpinnerModule],
  templateUrl: './teacher-calendar.component.html',
  styleUrl: './teacher-calendar.component.scss',
})
export class TeacherCalendarComponent {
  isLoadingResults: boolean = true;
  hourStart: number = 10;
  hourEnd: number = 23;
  hours: string[] = [];
  terms: terms[] = [];
  constructor(private httpTerms: TeacherTermsService) {
    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      this.hours.push(i + ':00');
    }
  }
  dataRange: dataRange = {
    start_date: '2024-11-09',
    end_date: '2024-11-15',
  };
  terms2: terms[] = [];
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
      });
  }
}
