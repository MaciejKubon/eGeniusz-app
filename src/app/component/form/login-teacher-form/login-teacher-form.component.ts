import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { LinkButtonComponent } from '../../button/link-button/link-button.component';
import { linkButton } from '../../../interface/interface';
import { LinkWithoutbackgroundButtonComponent } from '../../button/link-withoutbackground-button/link-withoutbackground-button.component';

@Component({
  selector: 'app-login-teacher-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatLabel,
    LinkButtonComponent,
    LinkWithoutbackgroundButtonComponent

  ],
  templateUrl: './login-teacher-form.component.html',
  styleUrl: './login-teacher-form.component.scss',
})
export class LoginTeacherFormComponent {
  navStudent: linkButton= { path: 'studentLogin', text: 'Jesteś uczniem? Zaloguj się.' };
  navForgot:linkButton =  { path: 'forgot-password', text: 'Przypomnij hasło' };
  navRegiester:linkButton = {path:'', text:'Nie posiadasz konta? Zarejestruj się.'};  
  myForm = new FormGroup({
    level: new FormControl(''),
  });
  hide = signal(true);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);
  errorEmailMessage = signal('');
  errorPasswordMessage = signal('');
  constructor() {
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
    if (this.email.invalid && this.password.invalid)
      console.log(this.email.invalid);
    else console.log(this.email.invalid);
  }
}
