import { Component, Input, OnInit } from '@angular/core';
import { TeacherTermsService } from '../../../service/http/teacher-terms.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { dataRange, terms, termsRequest } from '../../../interface/interface';
import { ActivatedRoute } from '@angular/router';
import { TeacherDetailDayTermComponent } from '../teacher-detail-day-term/teacher-detail-day-term.component';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [MatProgressSpinnerModule, TeacherDetailDayTermComponent],
  templateUrl: './teacher-detail.component.html',
  styleUrl: './teacher-detail.component.scss',
})
export class TeacherDetailComponent implements OnInit {
  @Input() teacherID: string|null = null;
  isLoadingResults: boolean = true;
  hourStart: number = 10;
  hourEnd: number = 23;
  hours: string[] = [];
  terms: terms[] = [];
  constructor(
    private httpTerms: TeacherTermsService,
    private route: ActivatedRoute
  ) {
    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      this.hours.push(i + ':00');
    }
  }
  dataRange: dataRange = {
    start_date: '2024-11-09',
    end_date: '2024-11-15',
  };
  ngOnInit() {
    this.httpTerms
      .getTeachersDetailTerms(this.dataRange, this.teacherID)
      .subscribe( (data: termsRequest[]) => {
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
