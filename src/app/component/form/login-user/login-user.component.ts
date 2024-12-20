import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { catchError, merge, throwError } from 'rxjs';
import { LinkButtonComponent } from '../../button/link-button/link-button.component';
import { linkButton } from '../../../interface/interface';
import { LinkWithoutbackgroundButtonComponent } from '../../button/link-withoutbackground-button/link-withoutbackground-button.component';
import { LoginHttpService } from '../../../service/http/login-http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../service/session/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
    LinkButtonComponent,
    LinkWithoutbackgroundButtonComponent,
  ],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginUserComponent {
  myForm = new FormGroup({
    level: new FormControl(''),
  });
  navTeacher: linkButton = {
    path: 'teacherLogin',
    text: 'Jesteś nauczycielem? Zaloguj się.',
  };
  navForgot: linkButton = { path: 'forgot-password', text: 'Przypomnij hasło' };
  navRegiester: linkButton = {
    path: 'studentRegister',
    text: 'Nie posiadasz konta? Zarejestruj się.',
  };
  hide = signal(true);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);
  errorEmailMessage = signal('');
  errorPasswordMessage = signal('');

  constructor(
    private LoginService: LoginHttpService,
    private AuthSession: AuthService,
    private router: Router
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorEmailMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorEmailMessage.set('Not a valid email');
    } else {
      this.errorEmailMessage.set('');
    }
  }
  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.errorPasswordMessage.set('You must enter a value');
    } else {
      this.errorPasswordMessage.set('');
    }
  }
  onSubmit() {
    this.updateEmailErrorMessage();
    this.updatePasswordErrorMessage();
    if (this.email.invalid || this.password.invalid) console.log('empty');
    else {
      this.LoginService.login({
        email: this.email.value,
        password: this.password.value,
        accountType: 3,
      })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('An error occurred:', error.error);
            return throwError(() => new Error('Error fetching data'));
          })
        )
        .subscribe((data: { token: string }) => {
          this.AuthSession.setToken(data.token);
          this.router.navigate(['/student']);
        });
    }
  }
}
