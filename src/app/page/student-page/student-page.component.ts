import { Component } from '@angular/core';
import { AuthService } from '../../service/session/auth.service';
import { Router } from '@angular/router';
import { LogoutButtonComponent } from '../../component/button/logout-button/logout-button.component';
import { UserDetailsComponent } from '../../component/details/user-details/user-details.component';

@Component({
  selector: 'app-student-page',
  standalone: true,
  imports: [LogoutButtonComponent, UserDetailsComponent],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.scss',
})
export class StudentPageComponent {
  constructor(private auth: AuthService, private router: Router) {
    if (auth.getToken() == null) this.router.navigate(['/studentLogin']);
  }
}
