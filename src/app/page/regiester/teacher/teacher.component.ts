import { Component } from '@angular/core';
import { TeacherFormComponent } from '../../../component/form/regiester/teacher-form/teacher-form.component';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [TeacherFormComponent],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.scss'
})
export class TeacherComponent {

}
