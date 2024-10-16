import { Component } from '@angular/core';
import { LoginTeacherFormComponent } from '../../component/form/login-teacher-form/login-teacher-form.component';

@Component({
  selector: 'app-login-teacher',
  standalone: true,
  imports: [LoginTeacherFormComponent],
  templateUrl: './login-teacher.component.html',
  styleUrl: './login-teacher.component.scss'
})
export class LoginTeacherComponent {

}
