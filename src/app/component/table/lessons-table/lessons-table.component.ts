import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { teacherLesson } from '../../../interface/interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

let data: teacherLesson[] = [
  {
    lessonName: 'matematyka',
    levelName: 'podstawowy',
    price: 23,
  },
];
@Component({
  selector: 'app-lessons-table',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,

    MatTableModule,
    CommonModule,
  ],
  templateUrl: './lessons-table.component.html',
  styleUrl: './lessons-table.component.scss',
})
export class LessonsTableComponent {
  isLoadingResults = false;
  displayedColumns: string[] = ['przedmiot', 'poziom', 'cena'];
  dataLessons: MatTableDataSource<teacherLesson> = new MatTableDataSource(data);
  ngOnInit() {
    console.log(this.dataLessons.data);
  }
}
