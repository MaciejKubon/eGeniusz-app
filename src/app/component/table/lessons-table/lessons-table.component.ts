import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { teacherLesson } from '../../../interface/interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { TeacherLessonsHttpService } from '../../../service/http/teacher-lessons-http.service';

@Component({
  selector: 'app-lessons-table',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, CommonModule],
  templateUrl: './lessons-table.component.html',
  styleUrl: './lessons-table.component.scss',
})
export class LessonsTableComponent {
  isLoadingResults = true;
  displayedColumns: string[] = ['przedmiot', 'poziom', 'cena'];
  dataLessons: MatTableDataSource<teacherLesson>;
  constructor(private httpSubject: TeacherLessonsHttpService) {
    this.dataLessons = new MatTableDataSource([
      {
        id: 0,
        teacher_id: 0,
        subject_id: 0,
        subject_level_id: 0,
        subject: { id: 0, name: 'string' },
        subject_level: { id: 0, name: 'string' },
        price: 0,
      },
    ]);
  }

  ngOnInit() {
    this.httpSubject.getLessons().subscribe((data) => {
      this.dataLessons = new MatTableDataSource(data);
      this.isLoadingResults = false;
    });
  }
}
