import { Component } from '@angular/core';
import { LoginUserComponent } from '../../component/form/login-user/login-user.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginUserComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
