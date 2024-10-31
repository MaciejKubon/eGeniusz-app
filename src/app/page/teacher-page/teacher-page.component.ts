import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutButtonComponent } from '../../component/button/logout-button/logout-button.component';
import { UserDetailsComponent } from '../../component/details/user-details/user-details.component';
import { AuthService } from '../../service/session/auth.service';
import { TeacherDetailsComponent } from '../../component/details/teacher-details/teacher-details.component';

@Component({
  selector: 'app-teacher-page',
  standalone: true,
  imports: [LogoutButtonComponent, TeacherDetailsComponent],
  templateUrl: './teacher-page.component.html',
  styleUrl: './teacher-page.component.scss'
})
export class TeacherPageComponent {
  constructor(private auth: AuthService, private router: Router) {
    if (auth.getToken() == null) this.router.navigate(['/studentLogin']);
  }
}
