import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LogoutButtonComponent } from '../../component/button/logout-button/logout-button.component';
import { AuthService } from '../../service/session/auth.service';
import { TeacherDetailsComponent } from '../../component/details/teacher-details/teacher-details.component';
import { LessonsComponent } from '../../component/teacher/lessons/lessons.component';
import { TeacherCalendarComponent } from '../../component/calendar/teacher-calendar/teacher-calendar.component';
import { TeacharHeaderComponent } from '../../component/header/teachar-header/teachar-header.component';


@Component({
  selector: 'app-teacher-page',
  standalone: true,
  imports: [RouterOutlet,LogoutButtonComponent, LessonsComponent, TeacherCalendarComponent, TeacharHeaderComponent],
  templateUrl: './teacher-page.component.html',
  styleUrl: './teacher-page.component.scss'
})
export class TeacherPageComponent {
  constructor(private auth: AuthService, private router: Router) {
    if (auth.getToken() == null) this.router.navigate(['/studentLogin']);
  }
}
