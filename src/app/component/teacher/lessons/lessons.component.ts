import { Component } from '@angular/core';
import { LessonsTableComponent } from '../../table/lessons-table/lessons-table.component';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [LessonsTableComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent {

}
