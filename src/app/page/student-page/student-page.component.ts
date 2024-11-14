import { Component } from '@angular/core';
import { AuthService } from '../../service/session/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { LogoutButtonComponent } from '../../component/button/logout-button/logout-button.component';
import { UserDetailsComponent } from '../../component/details/user-details/user-details.component';
import { TeachersListComponent } from '../../component/teachers-list/teachers-list.component';
import { StudentHeaderComponent } from '../../component/header/student-header/student-header.component';

@Component({
  selector: 'app-student-page',
  standalone: true,
  imports: [RouterOutlet,StudentHeaderComponent],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.scss',
})
export class StudentPageComponent {
  constructor(private auth: AuthService, private router: Router) {
    if (auth.getToken() == null) this.router.navigate(['/studentLogin']);
  }
}
