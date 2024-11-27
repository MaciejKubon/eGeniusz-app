import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LinkButtonComponent } from '../../../button/link-button/link-button.component';
import { linkButton } from '../../../../interface/interface';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LinkWithoutbackgroundButtonComponent } from '../../../button/link-withoutbackground-button/link-withoutbackground-button.component';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { merge, catchError, throwError } from 'rxjs';
import { RegisterHttpService } from '../../../../service/http/register-http.service';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    LinkButtonComponent,
    MatIconModule,
    MatLabel,
    MatButtonModule,
    LinkWithoutbackgroundButtonComponent,
  ],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.scss',
})
export class TeacherFormComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);
  readonly Repassword = new FormControl('', [Validators.required]);
  errorEmailMessage = signal('');
  errorPasswordMessage = signal('');
  errorRePasswordMessage = signal('');
  hide = signal(true);

  navTeacher: linkButton = {
    path: 'teacherLogin',
    text: 'Posiadasz konto? Zaloguj się',
  };
  navRegiester: linkButton = {
    path: 'studentRegister',
    text: 'Jesteś uczniem? Zarejestruj się.',
  };
  navForgot: linkButton = { path: 'forgot-password', text: 'Przypomnij hasło' };

  constructor(
    private RegisterService: RegisterHttpService,
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
  updateRePasswordErrorMessage() {
    if (this.Repassword.hasError('required')) {
      this.errorRePasswordMessage.set('You must enter a value');
    } else {
      this.errorRePasswordMessage.set('');
    }
  }
  creatUser() {
    this.updateEmailErrorMessage();
    this.updatePasswordErrorMessage();
    this.updateRePasswordErrorMessage();
    if (this.email.invalid || this.password.invalid) console.log('empty');
    else {
      this.RegisterService.register({
        email: this.email.value,
        password: this.password.value,
        accountType: 2,
      })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('An error occurred:', error.error);
            return throwError(() => new Error('Error fetching data'));
          })
        )
        .subscribe((data: { token: string }) => {
          console.log(data);
        });
    }
  }
}
