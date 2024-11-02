import { Component } from '@angular/core';
import { StudentFormComponent } from '../../../component/form/regiester/student-form/student-form.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [StudentFormComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {

}
