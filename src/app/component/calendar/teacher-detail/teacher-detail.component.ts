import { Component } from '@angular/core';
import { TeacherTermsService } from '../../../service/http/teacher-terms.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './teacher-detail.component.html',
  styleUrl: './teacher-detail.component.scss'
})
export class TeacherDetailComponent {
  isLoadingResults: boolean = false;
  hourStart: number = 10;
  hourEnd: number = 23;
  hours: string[] = [];
  constructor(private httpTerms: TeacherTermsService) {
    for (let i = this.hourStart; i <= this.hourEnd; i++) {
      this.hours.push(i + ':00');
    }
  }
}
